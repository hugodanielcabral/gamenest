import Router from "express";
import {
  getGames,
  getGame,
  getLatestGames,
  getPopularGames,
  getUpcomingGames,
  getAnticipatedGames,
} from "../controllers/games.controller";
import { GamesValidation } from "../validators/games.validation";
import type { ApiEndpoint } from "../types/apiroute";

const router = Router();

const gamesEndPoint: ApiEndpoint = "/games";

router.get(`${gamesEndPoint}/latest`, getLatestGames);
router.get(`${gamesEndPoint}/upcoming`, getUpcomingGames);
router.get(`${gamesEndPoint}/anticipated`, getAnticipatedGames);

router.get(`${gamesEndPoint}/popular`, getPopularGames);

router.get(gamesEndPoint, GamesValidation.validateQuery(), getGames);

router.get(`${gamesEndPoint}/:slug`, getGame);

export default router;
