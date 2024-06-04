import Router from "express";
import {
  signup,
  signin,
  signout,
  profile,
  verifyUser,
} from "../controllers/auth.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";
import {
  signupValidator,
  signinValidator,
} from "../validators/auth.validation.js";

const router = Router();

router.post("/signin", signinValidator, signin);

router.post("/signup", signupValidator, signup);

router.post("/signout", signout);

router.get("/profile", isAuth, profile);

router.get("/user/validate/:token", verifyUser);

export default router;
