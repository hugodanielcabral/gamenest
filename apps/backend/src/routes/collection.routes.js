import Router from "express";

import {
  createCollection,
  getCollections,
  getCollection,
  updateCollection,
  deleteCollection,
} from "../controllers/collection.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";
import {
  createCollectionValidator,
  updateCollectionValidator,
} from "../validators/collection.validation.js";

const router = Router();

router.get("/collection", isAuth, getCollections);

router.post("/collection", isAuth, createCollectionValidator, createCollection);

router.get("/collection/:id", isAuth, getCollection);

router.patch(
  "/collection/:id",
  isAuth,
  updateCollectionValidator,
  updateCollection
);

router.delete("/collection/:id", isAuth, deleteCollection);

export default router;
