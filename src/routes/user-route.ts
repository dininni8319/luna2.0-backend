import express from "express";

import {
  signin, 
  signup, 
  userProfile, 
  userUpdateProfile 
} from "../controllers/user/user-controller";
import { check } from "express-validator";

const router = express.Router();
const checkAuth = require("../middlewares/check-auth");

router.post("/",
[
  check("email")
   .normalizeEmail()
   .isEmail(),
  check('password')
   .isLength({min: 8}),
  check("first_name")
   .not()
   .isEmpty(),
  check("last_name")
   .not()
   .isEmpty(),
  check('code')
   .not()
   .isEmpty()
   .isLength({min: 8}),
], signup);

router.post("/signin", signin);

router.use(checkAuth);
router.get("/user/profile", userProfile);
router.patch("/user/update", userUpdateProfile);

export default router;

