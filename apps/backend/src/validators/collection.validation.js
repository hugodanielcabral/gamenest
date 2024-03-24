import { check } from "express-validator";
import { existsAndNotEmpty } from "../helpers/handleExistsAndNotEmpty.js";
import { validateResult } from "../helpers/handleValidateResult.js";

// TODO: Update the validation rules for the collection and database-schema

export const addGameToCollectionValidator = [
  existsAndNotEmpty("game_id", "Game ID")
    .isLength({ max: 100 })
    .withMessage("Game ID must be at most 100 characters long"),
  existsAndNotEmpty("platform", "Platform")
    .isLength({ max: 100 })
    .withMessage("Platform must be at most 100 characters long"),
  existsAndNotEmpty("ownership", "Ownership")
    .isLength({ min: 3 })
    .withMessage("Ownership must be at least 3 characters long")
    .isLength({ max: 30 })
    .withMessage("Ownership must be at most 100 characters long"),
  existsAndNotEmpty("status", "Status")
    .isLength({ min: 3 })
    .withMessage("Status must be at least 3 characters long")
    .isLength({ max: 30 })
    .withMessage("Status must be at most 100 characters long"),
  check("progress_note")
    .optional()
    .isString()
    .withMessage("Progress note must be a string")
    .isLength({ max: 255 })
    .withMessage("Progress note must be at most 255 characters long"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const updateGameFromCollectionValidator = [
  check("platform", "Platform")
    .optional()
    .notEmpty()
    .withMessage("Platform cannot be empty")
    .isLength({ max: 100 })
    .withMessage("Platform must be at most 100 characters long"),
  check("ownership", "Ownership")
    .optional()
    .notEmpty()
    .withMessage("Ownership cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Ownership must be at least 3 characters long")
    .isLength({ max: 30 })
    .withMessage("Ownership must be at most 30 characters long"),
  check("status", "Status")
    .optional()
    .notEmpty()
    .withMessage("Status cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Status must be at least 3 characters long")
    .isLength({ max: 30 })
    .withMessage("Status must be at most 30 characters long"),
  check("progress", "Progress")
    .optional()
    .notEmpty()
    .withMessage("Progress cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Progress must be at least 3 characters long")
    .isLength({ max: 30 })
    .withMessage("Progress must be at most 30 characters long"),
  check("progress_note")
    .optional()
    .isString()
    .withMessage("Progress note must be a string")
    .isLength({ max: 255 })
    .withMessage("Progress note must be at most 255 characters long"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
