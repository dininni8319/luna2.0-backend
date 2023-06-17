const User = require("../../models/user-model");
import { Request, Response } from 'express'
import { customError } from "../../error/http-error";
import { validationResult } from "express-validator";
import { findUser } from "./find-user-action";
import { sendCodeWithEmail } from "./sendemail-action";
import { generateCode } from "./generate-code-action";
import { createTempUserAction } from "./create-tempuser-action";
import { randomString } from "../../utils/randomCode";
import { NextFunction, RequestHandler } from "express";

export const emailVerification = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      customError("Invalid inputd passed, please check your data.", 422));
  }
  // looks if the user exists, if it does then it will throw an error
  await findUser(next, email);
 
  let verifyCode = randomString(8);

  const fail = await createTempUserAction(next, verifyCode, email);
  
  if (!fail) {
    return next(
      customError("Something went wrong.....", 500)
    );
  }
  await sendCodeWithEmail(next,verifyCode, email);
  
  res.status(200).json({code: verifyCode, message: "We sent a code for the verification, please check your email"})
};

export const sendCode: RequestHandler = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(
      customError("Please provide an email", 400)
    );
  }

  let userEmailExists;
  try {
    userEmailExists = await User.findOne({ email });
  } catch (err) {
    return next(
      customError("Something went wrong, please try it again later", 400)
    );
  }
  
  let verifyCode = generateCode(next);

  verifyCode && await sendCodeWithEmail(next,verifyCode, email);
  
  res.status(200).json({ message: "We sent a message to your email"});
};