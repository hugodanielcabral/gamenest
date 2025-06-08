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
import { AuthMiddleware } from "../middlewares/auth";
import { gamesValidation } from "../validators/games.validation.js";

const router = Router();

//! Debo analizar correctamente esto, como estará compuesto, que clases usar (usar diagrama para las clases), aplicar los cambios/mejoras a la BD, etc.

router.get("/games", gamesValidation, getGames);

router.get("/games/:id", getGame);

router.get("/count/games", getCountGames); //? Alguna forma de darle a Games?

router.get("/games/latest/released", getLatest);

router.get("/games/latest/upcoming", getUpcomingGames);

router.get("/games/latest/anticipated", getAnticipated);

router.get("/popular/games", getPopular);

router.get(
  "/achievement/:id",
  AuthMiddleware.validateJWT,
  getSteamGameAchievement
); //? Borrar?

router.get("/platforms/:platform", getPlatformGames);

router.get("/timetobeat/:id", getTimetoBeat); //? Alguna forma de darle a Games?

router.post("/search/games", getGamesBySearch); //? Otra forma de hacerlo?

router.post(
  "/achievement",
  AuthMiddleware.validateJWT,
  createSteamGameAchievement
); //? Borrar?

export default router;
