import Router from "express";
import {
  signup,
  signin,
  signout,
  profile,
  refresh,
} from "../controllers/auth.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/signin", signin);

router.post("/signup", signup);

router.post("/signout", signout);

router.get("/profile", AuthMiddleware.validateJWT, profile);

router.post("/refresh", refresh);

export default router;
