import Router from "express";

import {
  getCollection,
  getGameFromCollection,
  addCollection,
  updateCollection,
  deleteGameFromCollection,
  getTotalCollectionPages,
  getCollectionFilters,
} from "../controllers/collection.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";
import {
  addCollectionValidator,
  getCollectionValidator,
} from "../validators/collection.validation.js";

const router = Router();

router.get("/collection", isAuth, getCollectionValidator, getCollection);

router.get("/collection/:id", isAuth /* getCollectionFromUser */);

router.get("/collection/game/:gameSlug", isAuth, getGameFromCollection);

router.get("/collection/totalPages", isAuth, getTotalCollectionPages);

router.get("/collection/filters", isAuth, getCollectionFilters);

/* CollectionManage  */

router.post(
  "/collection/add/game",
  isAuth,
  addCollectionValidator,
  addCollection
);

router.patch("/collection/update/game/:gameSlug", isAuth, updateCollection);

router.delete("/collection/delete/game/:id", isAuth, deleteGameFromCollection);

export default router;
