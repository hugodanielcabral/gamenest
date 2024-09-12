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
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
