const validPassword = require("../../utils/passwordValidation");
import { customError } from "../../error/http-error";
import jwt from "jsonwebtoken";
import { NextFunction } from "express";

require("dotenv").config();
const JWT_KEY = process.env.JWT_KEY;

export const loginValidation = async (next: NextFunction, emailExists: any, password: string) => {

  let isValidPassword;
  let hash = emailExists?.password;
  try {
    isValidPassword = await validPassword(hash, password);
    
  } catch (err) {
    const error = customError(
      "Something went wrong!",
      400
    );
    return next(error);
  }
  
  if (isValidPassword && emailExists) {
     
    let token;
    try {
      if (JWT_KEY) {
        token = jwt.sign(
          {
            userId: emailExists._id,
            email: emailExists.email
          },JWT_KEY,
          { expiresIn: "1h"}
        )
      }
    } catch (err) {
      const error = customError(
        "Signing Up user failed, please try it again.",
        500
      );
      return next(error);
    }
    
    return token;
  }
};