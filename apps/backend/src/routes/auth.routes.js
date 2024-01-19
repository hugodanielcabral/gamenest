import Router from "express";

import {
  signup,
  signin,
  signout,
  profile,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/signin", signin);

router.post("/signup", signup);

router.post("/signout", signout);

router.get("/profile/:id", profile);

export default router;
