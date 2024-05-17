import Router from "express";

import {
  getCollection,
  getGameFromCollection,
  addGameToCollection,
  updateGameFromCollection,
  deleteGameFromCollection,
  getTotalCollectionPages,
  getCollectionFilters,
} from "../controllers/collection.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";
import {
  addGameToCollectionValidator,
  updateGameFromCollectionValidator,
} from "../validators/collection.validation.js";

const router = Router();

router.get("/collection", isAuth, getCollection);

router.get("/collection/:id", isAuth /* getCollectionFromUser */);

router.get("/collection/game/:gameSlug", isAuth, getGameFromCollection);

router.get("/collection/totalPages", isAuth, getTotalCollectionPages);

router.get("/collection/filters", isAuth, getCollectionFilters);

router.post("/collection/add/game", isAuth, addGameToCollection);

router.patch("/collection/update/:gameSlug", isAuth, updateGameFromCollection);

router.delete("/collection/:id", isAuth, deleteGameFromCollection);

export default router;
