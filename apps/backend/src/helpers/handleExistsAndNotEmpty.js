import { check } from "express-validator";

export const existsAndNotEmpty = (field, message) => {
  return check(field)
    .exists()
    .withMessage(`${message} is required`)
    .notEmpty()
    .withMessage(`${message} must not be empty`);
};
