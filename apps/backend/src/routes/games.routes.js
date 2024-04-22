import Router from "express";
import {
  getGames,
  getGame,
  getLatestGames,
  getPopularGames,
} from "../controllers/games.controller.js";

const router = Router();

router.get("/games", getGames);

router.get("/games/:id", getGame);

router.get("/games/latest/released", getLatestGames);

router.get("/popular/games", getPopularGames);

export default router;
