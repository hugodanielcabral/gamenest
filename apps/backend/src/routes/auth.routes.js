import Router from "express";
import {
  signup,
  signin,
  signout,
  profile,
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

export default router;
