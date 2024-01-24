import { existsAndNotEmpty } from "../helpers/handleExistsAndNotEmpty.js";
import { validateResult } from "../helpers/handleValidateResult.js";

export const createCollectionValidator = [
  existsAndNotEmpty("title", "Title")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long")
    .isLength({ max: 30 })
    .withMessage("Title must be at most 30 characters long"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const updateCollectionValidator = [
  existsAndNotEmpty("title", "Title")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long")
    .isLength({ max: 30 })
    .withMessage("Title must be at most 30 characters long"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
