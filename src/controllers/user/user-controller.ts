import { customError } from "../../error/http-error";
import { validationResult } from "express-validator";
import { findUser } from "../email/find-user-action";
import { verifyCode } from "./verification-code-action";
import { loginValidation } from "./login-validation-action";
import { createUser } from "./create-user-action";
import { findUserProfile } from "./profile-user-action";
import { updateProfileAction } from "./update-profile-action";
import { NextFunction, RequestHandler, Response, Request as ExpressRequest } from 'express';

export const signup: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      customError("Invalid inputd passed, please check your data.", 422)
    )
  }

  await verifyCode(req, res, next);

  let user = await createUser(req, res, next)

  if (user) {
    res.status(201).json(
       {
        message: "Your profile was created successfully!",
       }
    );
  } else {
    const error = customError(
      "Sign up failed, please try again later",
      500
    );
    return next(error);
  }
};

export const signin: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  let sendExistingUser = false;
  let emailExists = await findUser(next, email, sendExistingUser);
 
  let token = await loginValidation(next, emailExists, password);

  if (token) {
    res.status(200).json({
      user: {
         name: emailExists.name,
         email: emailExists.email,
         token: token
      }
    });
  } else {
    const error = customError(
      "Sign up failed, please try again later",
      500
    );
    return next(error);
  }
};

interface Request extends ExpressRequest {
  userData:{
      userId: string
  } 
}

export const userProfile: any = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.userData;

  let user = await findUserProfile(next, userId);

  if (!user || !userId) {
    const error = customError(
      "I did not find any user profile",
      500
    );
    return next(error);
  }

 return res.json({user: user.toObject({ getters: true })}) as any;
};

export const userUpdateProfile: any = async (req: Request, res: Response, next: NextFunction) => {
  let updatedProfile = await updateProfileAction(req, res, next);

  if (!updatedProfile) {
    const error = customError(
      "Your profile was not update",
      500
    );
    return next(error);
  }

 return res.json(updatedProfile);
};


