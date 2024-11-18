import Router from "express";
import {
  getRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
} from "../controllers/roles.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/roles", getRoles);

router.get("/roles/:id", getRole);

router.post("/roles", AuthMiddleware.validateJWT, createRole);

router.patch("/roles/:id", AuthMiddleware.validateJWT, updateRole);

router.delete("/roles/:id", AuthMiddleware.validateJWT, deleteRole);

export default router;
