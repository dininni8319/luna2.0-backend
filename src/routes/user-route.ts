import express from "express";

import {
  signin, 
  signup, 
  userProfile, 
  userUpdateProfile 
} from "../controllers/user/user-controller";
import { check } from "express-validator";
const checkAuth = require("../middlewares/check-auth");

const router = express.Router();

router.patch("/signup",
[
  check("email")
   .normalizeEmail()
   .isEmail(),
  check('password')
   .isLength({min: 8}),
  check("name")
   .not()
   .isEmpty(),
  check("location")
   .not()
   .isEmpty(),
  check('code')
   .not()
   .isEmpty()
   .isLength({min: 8}),
], signup);

router.post("/signin", signin);

router.use(checkAuth);
router.patch("/user/update", userUpdateProfile);
router.get("/user/profile", userProfile);

export default router;

