import { body, param, query } from "express-validator";
import { validateResult } from "../helpers/handleValidateResult.js";

const validSortOptions = {
  created_on: "l.created_on",
  updated_on: "l.updated_on",
  total_games: "lg.total_games",
  likes: "lk.total_likes",
};

export const getListsValidator = [
  query("order")
    .optional()
    .customSanitizer((value) => {
      const lowerCaseValue = value?.toLowerCase();

      if (lowerCaseValue === "asc" || lowerCaseValue === "desc") {
        return lowerCaseValue;
      }

      return "asc";
    }),
  query("sort")
    .optional()
    .customSanitizer((value) => {
      const lowerCaseValue = value.toLowerCase();
      return validSortOptions[lowerCaseValue] || "l.created_on";
    }),
  query("page")
    .optional()
    .customSanitizer((value) => {
      if (isNaN(value)) return 1;

      return value;
    }),
  query("q")
    .optional()
    .customSanitizer((value) => {
      if (!value) return "";

      return value.trim().toLowerCase();
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const getListsByIdValidator = [
  query("order")
    .optional()
    .customSanitizer((value) => {
      const lowerCaseValue = value?.toLowerCase();

      if (lowerCaseValue === "asc" || lowerCaseValue === "desc") {
        return lowerCaseValue;
      }

      return "asc";
    }),
  query("page")
    .optional()
    .customSanitizer((value) => {
      if (isNaN(value)) return 1;

      return value;
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const addListValidator = [
  body("title")
    .trim()
    .isString()
    .isLength({ min: 6, max: 40 })
    .withMessage("El título debe tener entre 6 y 40 caracteres"),
  body("description").optional().trim().isString().isLength({ max: 255 }),
  body("visibility").custom((value) => {
    if (value === "public" || value === "private") {
      return value;
    }
    throw new Error("Debes seleccionar un tipo de visibilidad válido");
  }),

  body("games").optional().isArray(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const updateListValidator = [
  body("title")
    .trim()
    .isString()
    .isLength({ min: 6, max: 40 })
    .withMessage("El título debe tener entre 6 y 40 caracteres"),
  body("description").optional().trim().isString().isLength({ max: 255 }),
  body("visibility").custom((value) => {
    if (value === "public" || value === "private") {
      return value;
    }
    throw new Error("Debes seleccionar un tipo de visibilidad válido");
  }),
  body("games").optional().isArray(),
  body("deletedGameIds").optional().isArray(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const deleteListValidator = [
  param("list_id").isInt(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const listLikeValidator = [
  param("list_id").isInt(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
