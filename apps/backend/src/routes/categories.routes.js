import Router from "express";
import { getGenre, getPlatform } from "../controllers/categories.controller.js";
import {
  getGenreValidator,
  getPlatformValidator,
} from "../validators/categories.validation.js";

const router = Router();

router.get("/category/platform/:platform", getPlatformValidator, getPlatform);

router.get("/category/genre/:genre", getGenreValidator, getGenre);

export default router;
