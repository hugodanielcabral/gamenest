import { query } from "express-validator";
import { validateResult } from "../helpers/handleValidateResult.js";

const validSortOptions = {
  created_on: "l.created_on",
  updated_on: "l.updated_on",
  total_games: "lg.total_games",
  total_likes: "lk.total_likes",
};

export const getPublicListsValidator = [
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

export const getPublicListsByIdValidator = [
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
