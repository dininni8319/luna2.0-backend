import { randomString } from "../../utils/randomCode";
import { customError } from "../../error/http-error";
import { NextFunction } from 'express'

export const generateCode = (next: NextFunction) => {
  let verifyCode;
  try {
    verifyCode = randomString(8); 
  } catch (err) {
    const error = customError(
      "Sign up failed, please try again later",
      500
    );
    return next(error);
  }

  return verifyCode;
};