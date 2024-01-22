import Router from "express";

import {
  createCollection,
  getCollections,
  getCollection,
  updateCollection,
  deleteCollection,
} from "../controllers/collection.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/collection", isAuth, createCollection);

router.get("/collection", isAuth, getCollections);

router.get("/collection/:id", isAuth, getCollection);

router.patch("/collection/:id", isAuth, updateCollection);

router.delete("/collection/:id", isAuth, deleteCollection);

export default router;
