import { existsAndNotEmpty } from "../helpers/handleExistsAndNotEmpty.js";
import { validateResult } from "../helpers/handleValidateResult.js";

export const roleValidator = [
  existsAndNotEmpty("name", "Role name")
    .isString()
    .withMessage("Role name must be a string")
    .isLength({ min: 3 })
    .withMessage("Role name must be at least 3 characters long")
    .isLength({ max: 30 })
    .withMessage("Role name must be at most 30 characters long"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
