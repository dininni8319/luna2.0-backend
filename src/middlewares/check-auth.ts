import jwt from "jsonwebtoken";
import { HttpError } from "../error/http-error";
import { RequestHandler } from 'express'

require('dotenv').config();

const JWT_KEY = process.env.JWT_KEY;

const authMiddleware: RequestHandler = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  
  try {
    const token = req.headers.authorization?.split(" ")[1]; //encode the token in the header "Bearer Token"
    if (!token) {
      throw new Error("Authorization failed!");
    } 
    if (JWT_KEY) {
      const decodedToken = jwt.verify(token, JWT_KEY)
      req.userData = { userId: decodedToken.userId }
      next();
    }

  } catch (err) {
    const error = new HttpError(
      "Authentication failed", 403 //forbidden
    );
    return next(error);
  }
};

export default authMiddleware