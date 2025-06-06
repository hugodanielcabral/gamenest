import { Router } from "express";
import {
  getCountries,
  getCountry,
  createCountry,
  updateCountry,
  deleteCountry,
} from "../controllers/country";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/countries", getCountries);

router.get("/countries/:id", getCountry);

router.post("/countries", AuthMiddleware.validateJWT, createCountry);

router.put("/countries/:id", AuthMiddleware.validateJWT, updateCountry);

router.delete("/countries/:id", AuthMiddleware.validateJWT, deleteCountry);

export default router;
