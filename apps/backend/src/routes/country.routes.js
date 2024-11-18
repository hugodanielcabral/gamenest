import Router from "express";
import {
  getCountries,
  getCountry,
  createCountry,
  updateCountry,
  deleteCountry,
} from "../controllers/country.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/country", getCountries);

router.get("/country/:id", getCountry);

router.post("/country", AuthMiddleware.validateJWT, createCountry);

router.patch("/country/:id", AuthMiddleware.validateJWT, updateCountry);

router.delete("/country/:id", AuthMiddleware.validateJWT, deleteCountry);

export default router;
