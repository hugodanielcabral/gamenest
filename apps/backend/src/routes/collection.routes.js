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
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import {
  addCollectionValidator,
  getCollectionValidator,
} from "../validators/collection.validation.js";

const router = Router();

router.get(
  "/collection",
  AuthMiddleware.validateJWT,
  getCollectionValidator,
  getCollection
);

router.get(
  "/collection/:id",
  AuthMiddleware.validateJWT /* getCollectionFromUser */
);

router.get(
  "/collection/game/:gameSlug",
  AuthMiddleware.validateJWT,
  getGameFromCollection
);

router.get(
  "/collection/totalPages",
  AuthMiddleware.validateJWT,
  getTotalCollectionPages
);

router.get(
  "/collection/filters",
  AuthMiddleware.validateJWT,
  getCollectionFilters
);

/* CollectionManage  */

router.post(
  "/collection/add/game",
  AuthMiddleware.validateJWT,
  addCollectionValidator,
  addCollection
);

router.patch(
  "/collection/update/game/:gameSlug",
  AuthMiddleware.validateJWT,
  addCollectionValidator,
  updateCollection
);

router.delete(
  "/collection/delete/game/:id",
  AuthMiddleware.validateJWT,
  deleteGameFromCollection
);

export default router;
