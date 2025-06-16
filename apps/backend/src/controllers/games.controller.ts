import { NextFunction, Request, Response } from "express";
import Games, { IMultiQueryResponse } from "../models/games.model";

export const getGames = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const {
      sort = "hypes",
      order = "desc",
      platforms = "",
      page = "1",
      q = "",
    } = req.query as {
      sort?: "name" | "rating" | "hypes";
      order?: "asc" | "desc";
      platforms?: string;
      page?: string;
      q?: string;
    };

    let games: IMultiQueryResponse[] | null;

    if (q) {
      games = await Games.search(platforms, page, q);
    } else {
      games = await Games.findAll(sort, order, platforms, page);
    }

    res.status(200).json(games);
  } catch (error) {
    next(error)
  }
};

export const getGame = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { slug } = req.params;

    // slug = "cyberpunk-2077 (example)"

    const game = await Games.findById(slug);

    res.status(200).json(game);
  } catch (error) {
    next(error)
  }
};

export const getLatestGames = async (req: Request, res: Response, next:NextFunction) => {
  const CURRENT_TIMESTAMP = Math.floor(Date.now() / 1000);
  const LAST_48_HOURS = CURRENT_TIMESTAMP - 172800;
  try {
    const latest = await Games.findByQuery({
      sort: "hypes",
      order: "desc",
      limit: 10,
      where: `first_release_date < ${CURRENT_TIMESTAMP} & first_release_date > ${LAST_48_HOURS}`,
    });

    res.status(200).json(latest);
  } catch (error) {
    next(error)
  }
};

export const getUpcomingGames = async (req: Request, res: Response, next:NextFunction) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const TOMORROW_TIMESTAMP = Math.floor(tomorrow.getTime() / 1000);

  try {
    const upcoming = await Games.findByQuery({
      sort: "first_release_date",
      order: "asc",
      limit: 10,
      where: `first_release_date > ${TOMORROW_TIMESTAMP}`,
    });

    res.status(200).json(upcoming);
  } catch (error) {
    next(error)
  }
};

export const getAnticipatedGames = async (req: Request, res: Response, next:NextFunction) => {
  const calculateTimestamp = (daysToAdd = 0, endOfDay = false) => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    endOfDay ? date.setHours(23, 59, 59, 999) : date.setHours(0, 0, 0, 0);
    return Math.floor(date.getTime() / 1000);
  };
  const TODAY_TIMESTAMP = calculateTimestamp();
  const FUTURE_TIMESTAMP = calculateTimestamp(100, true);

  try {
    const anticipated = await Games.findByQuery({
      sort: "hypes",
      order: "desc",
      limit: 4,
      where: `first_release_date >= ${TODAY_TIMESTAMP} 
      & first_release_date <= ${FUTURE_TIMESTAMP}`,
    });

    res.status(200).json(anticipated);
  } catch (error) {
    next(error)
  }
};

export const getPopularGames = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const popularityGames = await Games.findByPopScore();

    const gamesIds = popularityGames?.map(({ game_id }) => game_id) ?? [];

    const games = await Games.findById(gamesIds);

    res.status(200).json(games);
  } catch (error) {
    next(error)
  }
};
