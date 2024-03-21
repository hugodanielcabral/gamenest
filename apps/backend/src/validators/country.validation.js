import { existsAndNotEmpty } from "../helpers/handleExistsAndNotEmpty.js";
import { validateResult } from "../helpers/handleValidateResult.js";

export const countryValidator = [
  existsAndNotEmpty("country_name", "Country name")
    .isString()
    .withMessage("Country name must be a string")
    .isLength({ min: 3 })
    .withMessage("Country name must be at least 3 characters long")
    .isLength({ max: 30 })
    .withMessage("Country name must be at most 30 characters long"),
  existsAndNotEmpty("country_domain", "Country domain")
    .isString()
    .withMessage("Country domain must be a string")
    .isLength({ min: 2 })
    .withMessage("Country domain must be at least 2 characters long")
    .isLength({ max: 2 })
    .withMessage("Country domain must be at most 2 characters long"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
