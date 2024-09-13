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
  getCountGames,
} from "../controllers/games.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";
import { gamesValidation } from "../validators/games.validation.js";

const router = Router();

router.get("/games", gamesValidation, getGames);

router.get("/games/:id", getGame);

router.get("/count/games", getCountGames);

router.get("/games/latest/released", getLatestGames);

router.get("/games/latest/upcoming", getUpcomingGames);

router.get("/games/latest/anticipated", getMostAnticipatedGames);

router.get("/popular/games", getPopularGames);

router.get("/achievement/:id", isAuth, getSteamGameAchievement);

router.post("/achievement", isAuth, createSteamGameAchievement);

export default router;
