import Router from "express";
import {
  getPublicLists,
  getPublicListsById,
} from "../controllers/lists.controller.js";
import {
  getPublicListsByIdValidator,
  getPublicListsValidator,
} from "../validators/lists.validation.js";

const router = Router();

router.get("/lists", getPublicListsValidator, getPublicLists);

router.get("/lists/:id", getPublicListsByIdValidator, getPublicListsById);

export default router;
