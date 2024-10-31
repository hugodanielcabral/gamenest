import Router from "express";
import {
  addList,
  addListLike,
  deleteList,
  deleteListLike,
  getPrivateLists,
  getPrivateListsById,
  getPublicLists,
  getPublicListsById,
  updateList,
} from "../controllers/lists.controller.js";
import {
  listLikeValidator,
  addListValidator,
  deleteListValidator,
  getListsByIdValidator,
  getListsValidator,
  updateListValidator,
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

router.put("/lists/:list_id", isAuth, updateListValidator, updateList);

router.delete("/lists/:list_id", isAuth, deleteListValidator, deleteList);

router.post("/lists/like/:list_id", isAuth, listLikeValidator, addListLike);

router.delete(
  "/lists/like/:list_id",
  isAuth,
  listLikeValidator,
  deleteListLike
);

export default router;
