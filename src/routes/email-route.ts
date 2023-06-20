import express from "express";
import { check } from "express-validator";
import { emailVerification, sendCode } from "../controllers/email/email-controller";

const router = express.Router();

router.post("/verify", 
 [
  check('email')
    .normalizeEmail()
    .isEmail()
 ],
  emailVerification
);

router.post("/reset/password",
[
 check('email')
  .normalizeEmail()
  .isEmail()
],
 sendCode);

export default router;