const User = require("../../models/user-model");
import { customError } from "../../error/http-error";
import { NextFunction } from 'express'

export const findUser = async ( next: NextFunction, email: string, sendExistingUser = true) => {
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = customError(
      "Sign up failed, please try again later",
      500
    );
    return next(error);
  }

  if (existingUser && sendExistingUser) {
    const error = customError(`User exists already, please login instead`,
     422 
    );
    return next(error);
  }

  if(!sendExistingUser) return existingUser;
};