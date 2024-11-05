import Router from "express";
import {
  addList,
  addListLike,
  deleteList,
  getListLikes,
  getPopularLists,
  getPrivateLists,
  getPublicLists,
  getListsById,
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
import { optionalAuth } from "../middlewares/optionalAuth.middleware.js";

const router = Router();

router.get("/lists", getListsValidator, getPublicLists);

router.get("/lists/:id", getListsByIdValidator, optionalAuth, getListsById);

router.get("/popular/lists", getPopularLists);

router.get("/user/lists", isAuth, getListsValidator, getPrivateLists);

router.post("/lists", isAuth, addListValidator, addList);

router.put("/lists/:list_id", isAuth, updateListValidator, updateList);

router.delete("/lists/:list_id", isAuth, deleteListValidator, deleteList);

router.get("/lists/like/:list_id", isAuth, getListLikes);

router.post("/lists/like/:list_id", isAuth, listLikeValidator, addListLike);

export default router;
