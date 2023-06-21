const User = require("../../models/user-model");
import { customError } from "../../error/http-error";
import { hashedPassword } from "./hash-password-action";
import { Request, Response, NextFunction } from 'express'
import { IData } from './user.interfaces'

export const createUser = async (req: IData, res: Response, next: NextFunction): Promise<string | void> => {
  const { name, location, email, code } = req.body;
  let hashPassword = await hashedPassword(req, res, next);
  
  const user = {
    name,
    location,
    password: hashPassword,
    
    active: "Active"
  };

  let newUser: typeof user;

  // let confirmationCode = await User.findOne({email})
  
  // if (confirmationCode !== code.trim()) {
  //   const error = customError(
  //         "Code not valid.",
  //         500
  //   );

  //   return next(error);
  // }

  if (hashPassword) {
 
    try {
      newUser = await User.findOneAndUpdate({ email }, user); 
      

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