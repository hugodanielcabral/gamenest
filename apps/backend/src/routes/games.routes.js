import Router from "express";
import { getGames } from "../controllers/games.controller.js";

const router = Router();

router.get("/games", getGames);

/* router.get("/games/search", searchGame);
 */
/* router.get("/games/count", getGamesCount);
 */
export default router;
