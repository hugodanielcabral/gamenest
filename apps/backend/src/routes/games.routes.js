import Router from "express";
import {
  getGames,
  getGame,
  getLatest,
  getPopular,
  getSteamGameAchievement,
  createSteamGameAchievement,
  getUpcomingGames,
  getAnticipated,
  getCountGames,
  getGamesBySearch,
  getPlatformGames,
  getTimetoBeat,
} from "../controllers/games.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { gamesValidation } from "../validators/games.validation.js";

const router = Router();

router.get("/games", gamesValidation, getGames);

router.get("/games/:id", getGame);

router.get("/count/games", getCountGames);

router.get("/games/latest/released", getLatest);

router.get("/games/latest/upcoming", getUpcomingGames);

router.get("/games/latest/anticipated", getAnticipated);

router.get("/popular/games", getPopular);

router.get(
  "/achievement/:id",
  AuthMiddleware.validateJWT,
  getSteamGameAchievement
);

router.get("/platforms/:platform", getPlatformGames);

router.get("/timetobeat/:id", getTimetoBeat);

router.post("/search/games", getGamesBySearch);

router.post(
  "/achievement",
  AuthMiddleware.validateJWT,
  createSteamGameAchievement
);

export default router;
