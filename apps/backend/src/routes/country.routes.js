import Router from "express";
import {
  getCountries,
  getCountry,
  createCountry,
  updateCountry,
  deleteCountry,
} from "../controllers/country.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";
import { countryValidator } from "../validators/country.validation.js";

const router = Router();

router.get("/country", getCountries);

router.get("/country/:id", getCountry);

router.post("/country", isAuth, countryValidator, createCountry);

router.patch("/country/:id", isAuth, countryValidator, updateCountry);

router.delete("/country/:id", isAuth, deleteCountry);

export default router;
