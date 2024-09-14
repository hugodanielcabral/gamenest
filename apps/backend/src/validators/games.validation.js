import { validateResult } from "../helpers/handleValidateResult.js";
import { query } from "express-validator";

export const gamesValidation = [
  query("page")
    .optional()
    .customSanitizer((value) => {
      const parsedPageNumber = parseInt(value);

      if (Number.isNaN(parsedPageNumber) || parsedPageNumber < 1) {
        return 1;
      }

      return parsedPageNumber;
    }),
  query("sort")
    .optional()
    .customSanitizer((value) => {
      if (value !== "name" && value !== "rating") {
        return "name";
      }

      return value;
    }),
  query("order")
    .optional()
    .customSanitizer((value) => {
      if (value !== "asc" && value !== "desc") {
        return "asc";
      }

      return value;
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
