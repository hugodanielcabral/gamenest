import Router from "express";
import { getGames, getGame } from "../controllers/games.controller.js";

const router = Router();

router.get("/games", getGames);

router.get("/games/:id", getGame);

export default router;
