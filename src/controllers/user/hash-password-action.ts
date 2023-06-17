import bcrypt from "bcrypt";
import { customError } from "../../error/http-error";
import { RequestHandler } from 'express'

export const hashedPassword: RequestHandler = async (req, res, next) => {
  const { password } = req.body;
  let hashPassword;
  try {
    hashPassword = await bcrypt.hash(password, 10);
  } catch (err) {
    const error = customError(
      "Could not create a user, try it again.",
      500
    );

    return next(error);
  }
  return hashPassword;
};
