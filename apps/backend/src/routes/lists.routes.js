import Router from "express";
import { getPublicLists } from "../controllers/lists.controller.js";
import { getPublicListsValidator } from "../validators/lists.validation.js";

const router = Router();

router.get("/lists", getPublicListsValidator, getPublicLists);

export default router;
