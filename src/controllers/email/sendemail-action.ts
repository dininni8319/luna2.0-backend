const User = require("../../models/user-model");
import Transporter from "../../mail/trasporter";
import { customError } from "../../error/http-error";
import { NextFunction } from "express";
import { randomString } from '../../utils/randomCode'

export const sendCodeWithEmail = async (next: NextFunction, verificationCode: string, email: string) => {
  let sendEmail;
  let randomUser = randomString()
  let link = `http://127.0.0.1:5173/create/profile/${randomUser}`
  
  try {
    sendEmail = await Transporter.sendMail({
      from: "s.dininni@yahoo.com",
      to: email,
      subject: "Confirmation code",
      text: `This is your confirmation code, use it to finish your registration`,
      html: `<h2>Hello from Luna, here is your code: ${verificationCode}, <a href=${link}>click on this link</a></h2>
      `
    })
  } catch (err) {
    const error = customError(
      "The email was not sent, please try again later",
      500
    );

    if(!sendEmail) {
      await User.findOneAndDelete({ email: email });
      return next(error);
    }
  };
}