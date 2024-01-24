import Router from "express";

import {
  getCollectionUsers,
  getCollectionByUser,
  createCollectionUser,
  updateCollectionUser,
  deleteCollectionUser,
} from "../controllers/collection_user.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";
import {
  createCollectionUserValidator,
  updateCollectionUserValidator,
} from "../validators/collection_user_validation.js";
const router = Router();

//* This one would be for the admin
router.get("/collection_user", isAuth, getCollectionUsers);

router.get("/collection_user/:id", isAuth, getCollectionByUser);

router.post(
  "/collection_user",
  isAuth,
  createCollectionUserValidator,
  createCollectionUser
);

router.patch(
  "/collection_user/:id",
  isAuth,
  updateCollectionUserValidator,
  updateCollectionUser
);

router.delete("/collection_user/:id", isAuth, deleteCollectionUser);

export default router;
