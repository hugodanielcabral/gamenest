import { validationResult } from "express-validator";

//* This middleware checks if there are errors in the validation result
//* If there are errors, it sends a 400 status code with the errors array
//* If there are no errors, it calls the next middleware
export const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
