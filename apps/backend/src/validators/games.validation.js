import { validateResult } from "../helpers/handleValidateResult.js";
import { query } from "express-validator";
import { availablePlatforms } from "../data/availablePlatforms.js";

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
  query("platforms")
    .optional()
    .customSanitizer((value) => {
      const splitArray = value.split(",");

      const filteredPlatforms = splitArray.filter((item) => {
        const matchingPlatform = availablePlatforms.find(
          (platform) => platform.value === item
        );

        return matchingPlatform.value;
      });

      if (filteredPlatforms.length === 0) return "";

      return filteredPlatforms.join(",");
    }),
  query("favorites").optional().isBoolean(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
