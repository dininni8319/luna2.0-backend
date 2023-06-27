import jwt from "jsonwebtoken";
import { HttpError } from "../error/http-error";
import { Request as ExpressRequest, Response, NextFunction } from 'express'

require('dotenv').config();

const JWT_KEY = process.env.JWT_KEY;

interface Request extends ExpressRequest {
  userData: { userId: string }
}

// token.ts
export interface TokenInterface {
  userData: {
     userId: number;
  };
}

const authMiddleware = (req:Request, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    
    const token = req.headers.authorization?.split(" ")[1]; //encode the token in the header "Bearer Token"
    
    if (!token) {
      throw new Error("Authorization failed!");
    } 
    if (JWT_KEY && token) {
      const decodedToken = jwt.verify(token, JWT_KEY)
      req.userData = (decodedToken as any).userId
      
      next();
    }

  } catch (err) {
    const error = new HttpError(
      "Authentication failed", 403 //forbidden
    );
    return next(error);
  }
};

module.exports = authMiddleware