import Router from "express";
import {
  getCountries,
  getCountry,
  createCountry,
  updateCountry,
  deleteCountry,
} from "../controllers/country.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/country", getCountries);

router.get("/country/:id", getCountry);

router.post("/country", isAuth, createCountry);

router.patch("/country/:id", isAuth, updateCountry);

router.delete("/country/:id", isAuth, deleteCountry);

export default router;
