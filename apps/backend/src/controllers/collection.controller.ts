import { AuthRequest } from "../middlewares/auth.middleware.js";
import Collection from "../models/collection.model.js";
import { Request, Response, NextFunction } from "express";
import { ICollection } from "../types/collection.js";
import { parseQueryString } from "../utils/parseQueryString";
import { AppError } from "../utils/appError.js";

export const getCollection = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const q = req.query.q as string;

  const parsedOrder = parseQueryString(
    typeof req.query?.order === "string" ? req.query.order : ""
  );
  const parsedFilter = parseQueryString(
    typeof req.query?.filters === "string" ? req.query.filters : ""
  );

  try {
    const collection = await Collection.findAll(
      req.user_id,
      parsedOrder,
      parsedFilter,
      page,
      limit,
      q
    );

    res.status(200).json(collection);
  } catch (error) {
    next(error);
  }
};

export const addCollection = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const body = req.body as ICollection;

  try {
    const newCollection = await Collection.create(req.user_id, body);

    res.status(201).json(newCollection);
  } catch (error) {
    next(error);
  }
};

export const updateCollection = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { gameSlug } = req.params;

  try {
    const gameExists = await Collection.findById(req.user_id, gameSlug);

    if (!gameExists) {
      throw new AppError("El juego no fue encontrado en tu colección", 404);
    }
    const collection = await Collection.update(req.user_id, req.body, gameSlug);

    res.status(200).json(collection);
  } catch (error) {
    next(error);
  }
};

export const deleteCollection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const collection = await Collection.delete(id);

    if (!collection) {
      throw new AppError("No se logró eliminar la colección.");
    }

    res.status(204).json(collection);
  } catch (error) {
    next(error);
  }
};
