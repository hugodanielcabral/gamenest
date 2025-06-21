import Router from "express";

import {
  getCollection,
  addCollection,
  updateCollection,
  deleteCollection,
} from "../controllers/collection.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import type { ApiEndpoint } from "../types/apiroute";

const router = Router();

const collectionEndPoint: ApiEndpoint = "/collection";

router.get(collectionEndPoint, AuthMiddleware.validateJWT, getCollection);

router.get(
  `${collectionEndPoint}/:id`,
  AuthMiddleware.validateJWT /* getCollectionFromUser */
);

/* CollectionManage  */

router.post(
  `${collectionEndPoint}/add`,
  AuthMiddleware.validateJWT,
  addCollection
);

router.put(
  "/collection/update/:gameSlug",
  AuthMiddleware.validateJWT,
  updateCollection
);

router.delete(
  "/collection/delete/:id",
  AuthMiddleware.validateJWT,
  deleteCollection
);

export default router;
