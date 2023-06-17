const User = require("../../models/user-model");
import { customError } from "../../error/http-error";
import { hashedPassword } from "./hash-password-action";
import { Request, Response, NextFunction } from 'express'
import { IData } from './user.interfaces'

export const createUser = async (req: IData, res: Response, next: NextFunction): Promise<string | void> => {
  const { first_name, last_name, email } = req.body;
  let hashPassword = await hashedPassword(req, res, next);
  let newUser;

  if (hashPassword) {
    const user = {
      first_name,
      last_name,
      password: hashPassword,
      // confirmationCode: "",
      active: "Active"
    };
 
    try {
      newUser = await User.findOneAndUpdate({email: email}, user);  
    } catch (err) {
      const error = customError(
        "Could not create a user, try it again.",
        500
      );

      return next(error);
    }
  } else {
    const error = customError(
      "Sign up failed, please try again later",
      500
    );

    return next(error);
  }
  return JSON.stringify(newUser);
};