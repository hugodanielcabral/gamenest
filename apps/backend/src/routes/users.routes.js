import Router from "express";
import { isAuth } from "../middlewares/auth.middleware.js";
import { getProfileStats } from "../controllers/users.controller.js";

const router = Router();

router.get("/user/profile/stats", isAuth, getProfileStats);

export default router;
