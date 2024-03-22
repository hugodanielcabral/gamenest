import Router from "express";

import {
  getCollections,
  getAllGamesFromUser,
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

router.get("/collection", isAuth, getCollections);

router.get("/collection/:id", isAuth, getAllGamesFromUser);

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
