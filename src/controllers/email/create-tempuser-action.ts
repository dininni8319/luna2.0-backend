const User = require("../../models/user-model");
import { customError } from "../../error/http-error";
import { NextFunction } from "express";

export const createTempUserAction = async(next: NextFunction, code: string, email: string) => {
  let tempUser;

  try {
    tempUser = new User({
      email,
      confirmationCode:code
    })
  } catch (err) {
    const error = customError(
      "Sign up failed, please try again later",
      500
    );
    return next(error);
  }

  if (tempUser) {
    await tempUser.save();
  } else {
    const error = customError(
      "Sign up failed, please try again later",
      500
    );
    return next(error);
  }
  return tempUser;
}