import Router from "express";
import {
  signup,
  signin,
  signout,
  profile,
  refresh,
} from "../controllers/auth.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import {
  signinValidator,
  signupValidator,
} from "../validators/auth.validation.js";

const router = Router();

router.post("/signin", signinValidator, signin);

router.post("/signup", signupValidator, signup);

router.post("/signout", signout);

router.get("/profile", AuthMiddleware.validateJWT, profile);

router.post("/refresh", refresh);

export default router;
