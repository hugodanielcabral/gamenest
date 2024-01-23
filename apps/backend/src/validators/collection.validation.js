import { check } from "express-validator";
import { validateResult } from "../helpers/handleValidateResult.js";

export const createCollectionValidator = [
  check("title")
    .exists()
    .withMessage("Title is required")
    .notEmpty()
    .withMessage("Title must not be empty")
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
  check("title")
    .exists()
    .withMessage("Title is required")
    .notEmpty()
    .withMessage("Title must not be empty")
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
