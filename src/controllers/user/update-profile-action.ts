const User = require("../../models/user-model");
import { customError } from "../../error/http-error";
import { Request, Response, NextFunction } from 'express'
import { IUser } from './user.interfaces'

export const updateProfileAction = async (req: IUser, res: Response, next: NextFunction) => {
  const { userId } = req.userData;
  let user;
  
  try {
    user = await User.findOneAndUpdate({_id: userId}, req.body).exec();
  } catch (err) {
    const error = customError(
      "I did not find any user profile",
      500
    );
    return next(error);
  }
  
  if (!user) {
    const error = customError(
      "I did not update your profile",
      500
    );
    return next(error);
  }
  return { message: "successful profile updated"};
}