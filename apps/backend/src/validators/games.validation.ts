import { validateResult } from "../helpers/handleValidateResult";
import { query } from "express-validator";
import { Request, Response, NextFunction } from "express";

export class GamesValidation {
  static validateQuery() {
    return [
      query("page")
        .optional()
        .customSanitizer((value: string) => {
          const parsedPageNumber = parseInt(value);

          if (Number.isNaN(parsedPageNumber) || parsedPageNumber < 1) {
            return "1";
          }

          return value;
        }),
      query("sort")
        .optional()
        .customSanitizer((value: "name" | "rating" | "hypes") => {
          if (value !== "name" && value !== "rating" && value !== "hypes") {
            return "hypes";
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
      query("platforms")
        .optional()
        .customSanitizer((value: string) => {
          const parsedPlatform = parseInt(value);

          if (Number.isNaN(parsedPlatform) || parsedPlatform < 1) {
            return "";
          }
          return value;
        }),
      query("q")
        .optional()
        .customSanitizer((value: string) => {
          return value.trim();
        }),
      (req: Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next);
      },
    ];
  }
}
