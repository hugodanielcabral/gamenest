import Router from "express";

import {
  getCollection,
  addGameToCollection,
  updateGameFromCollection,
  deleteGameFromCollection,
} from "../controllers/collection.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";
import {
  addGameToCollectionValidator,
  updateGameFromCollectionValidator,
} from "../validators/collection.validation.js";

const router = Router();

router.get("/collection", isAuth, getCollection);

router.get("/collection/:id", isAuth /* getCollectionFromUser */);

router.post(
  "/collection",
  isAuth,
  addGameToCollectionValidator,
  addGameToCollection
);

router.patch(
  "/collection/:id",
  isAuth,
  updateGameFromCollectionValidator,
  updateGameFromCollection
);

router.delete("/collection/:id", isAuth, deleteGameFromCollection);

export default router;
