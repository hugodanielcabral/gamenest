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
import { AuthMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/lists", getListsValidator, getPublicLists);

router.get(
  "/lists/:id",
  getListsByIdValidator,
  AuthMiddleware.optionalAuth,
  getListsById
);

router.get("/popular/lists", getPopularLists);

router.get("/user/lists", AuthMiddleware.validateJWT, getPrivateLists);

router.post("/lists", AuthMiddleware.validateJWT, addListValidator, addList);

router.put(
  "/lists/:list_id",
  AuthMiddleware.validateJWT,
  updateListValidator,
  updateList
);

router.delete(
  "/lists/:list_id",
  AuthMiddleware.validateJWT,
  deleteListValidator,
  deleteList
);

router.get("/lists/like/:list_id", AuthMiddleware.validateJWT, getListLikes);

router.post(
  "/lists/like/:list_id",
  AuthMiddleware.validateJWT,
  listLikeValidator,
  addListLike
);

export default router;
