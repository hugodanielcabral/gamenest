import { check } from "express-validator";
import { existsAndNotEmpty } from "../helpers/handleExistsAndNotEmpty.js";
import { validateResult } from "../helpers/handleValidateResult.js";

export const createCollectionValidator = [
  existsAndNotEmpty("title", "Title")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long")
    .isLength({ max: 30 })
    .withMessage("Title must be at most 30 characters long"),
  check("description")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Description must be at most 100 characters long"),
  existsAndNotEmpty("color", "Color"),
  existsAndNotEmpty("category", "Category"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const updateCollectionValidator = [
  existsAndNotEmpty("title", "Title")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long")
    .isLength({ max: 30 })
    .withMessage("Title must be at most 30 characters long"),
  check("description")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Description must be at most 100 characters long"),
  existsAndNotEmpty("color", "Color"),
  existsAndNotEmpty("category", "Category"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
