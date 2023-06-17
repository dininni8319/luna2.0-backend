import bcrypt from "bcrypt";
import { customError } from "../../error/http-error";
import { Request, Response, NextFunction } from 'express'

export const hashedPassword = async (req: Request, res: Response, next: NextFunction): Promise<string | void> => {
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
