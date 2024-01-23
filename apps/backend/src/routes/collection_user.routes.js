import Router from "express";

import {
  getCollectionUsers,
  getCollectionByUser,
  createCollectionUser,
  updateCollectionUser,
  deleteCollectionUser,
} from "../controllers/collection_user.controller.js";

const router = Router();

//* This one would be for the admin
router.get("/collection_user", getCollectionUsers);

router.get("/collection_user/:id", getCollectionByUser);

router.post("/collection_user", createCollectionUser);

router.patch("/collection_user/:id", updateCollectionUser);

router.delete("/collection_user/:id", deleteCollectionUser);

export default router;
