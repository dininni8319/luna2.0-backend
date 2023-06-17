import { customError } from "../../error/http-error";
import { RequestHandler } from 'express'
const User = require("../../models/user-model");

export const verifyCode: RequestHandler = async (req, res, next) => {
  let { code } = req.body;
  let confirmationCode;
  
  try {
    confirmationCode = await User.findOne({confirmationCode: code});
  } catch (err) {
    const error = customError(`Something went wrong.`, 500);

  return next(error);
  }

  if (!confirmationCode || code === "") {
    const error = customError(`Confirmation code does not exists, please request a new one.`,
      422 
    );
    return next(error);
  }
};