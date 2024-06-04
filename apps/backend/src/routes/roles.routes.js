import Router from "express";
import {
  getRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
} from "../controllers/roles.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/roles", getRoles);

router.get("/roles/:id", getRole);

router.post("/roles", isAuth, createRole);

router.patch("/roles/:id", isAuth, updateRole);

router.delete("/roles/:id", isAuth, deleteRole);

export default router;
