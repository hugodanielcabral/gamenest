import Router from "express";
import { AuthMiddleware } from "../middlewares/auth";
import { getProfileStats } from "../controllers/users.controller.js";

const router = Router();

router.get("/user/profile/stats", AuthMiddleware.validateJWT, getProfileStats);

export default router;
