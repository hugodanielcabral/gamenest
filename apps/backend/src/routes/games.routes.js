import Router from "express";
import {
  getGames,
  getGame,
  getLatestGames,
  getPopularGames,
  getSteamGameAchievement,
  createSteamGameAchievement,
  getUpcomingGames,
  getMostAnticipatedGames,
} from "../controllers/games.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/games", getGames);

router.get("/games/:id", getGame);

router.get("/games/latest/released", getLatestGames);

router.get("/games/latest/upcoming", getUpcomingGames);

router.get("/games/latest/anticipated", getMostAnticipatedGames);

router.get("/popular/games", getPopularGames);

router.get("/achievement/:id", isAuth, getSteamGameAchievement);

router.post("/achievement", isAuth, createSteamGameAchievement);

export default router;
