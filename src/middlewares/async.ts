import { customError } from "../error/http-error";
import { Request, Response, NextFunction } from "express";

const AsyncWrapper = (fn: any, error: string, statusCode: number) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await  fn(req, res, next)
    } catch (err) {
      next(customError(error, statusCode));
    }
  }
}

module.exports = AsyncWrapper;