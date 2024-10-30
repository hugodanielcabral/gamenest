import Router from "express";
import {
  addList,
  getPrivateLists,
  getPrivateListsById,
  getPublicLists,
  getPublicListsById,
} from "../controllers/lists.controller.js";
import {
  addListValidator,
  getListsByIdValidator,
  getListsValidator,
} from "../validators/lists.validation.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/lists", getListsValidator, getPublicLists);

router.get("/lists/:id", getListsByIdValidator, getPublicListsById);

router.get("/user/lists", isAuth, getListsValidator, getPrivateLists);

router.get(
  "/user/lists/:id",
  isAuth,
  getListsByIdValidator,
  getPrivateListsById
);

router.post("/lists", isAuth, addListValidator, addList);

export default router;
