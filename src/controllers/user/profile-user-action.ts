const User = require("../../models/user-model");
import { customError } from "../../error/http-error";
import { NextFunction } from "express";

export const findUserProfile = async (next: NextFunction, userId: string) => {
  let user;

  try {
    user = await User.findOne({_id: userId}, "-password -active -confirmationCode"); 
  } catch (err) {
    const error = customError(
      "Something went wrong.",
      500
    );
    return next(error);
  }
  
  if (!user) {
    const error = customError(
      "User Profile not found.",
      500
    );
    return next(error); 
  }
  return user;
};