import { check } from "express-validator";
import { validateResult } from "../helpers/handleValidateResult.js";
import sql from "../db.js";
import { comparePassword } from "../helpers/handleBcrypt.js";

export const signupValidator = [
  check("username")
    .exists()
    .withMessage("Username is required")
    .notEmpty()
    .withMessage("Username must not be empty")
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 5 })
    .withMessage("Username must be at least 5 characters long")
    .isLength({ max: 20 })
    .withMessage("Username must be at most 20 characters long")
    .custom(async (value) => {
      const user = await sql`SELECT * FROM users WHERE username = ${value}`;

      if (user.length > 0) {
        throw new Error("Username already in use");
      }
    }),
  check("email")
    .exists()
    .withMessage("Email is required")
    .notEmpty()
    .withMessage("Email must not be empty")
    .isEmail()
    .withMessage("Email must be a valid email")
    .isLength({ max: 60 })
    .withMessage("Email must be at most 60 characters long")
    .custom(async (value) => {
      const user = await sql`SELECT * FROM users WHERE email = ${value}`;
      if (user[0]) {
        throw new Error("Email already in use");
      }
    }),
  check("pass")
    .exists()
    .withMessage("Password is required")
    .notEmpty()
    .withMessage("Password must not be empty")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long")
    .isLength({ max: 30 })
    .withMessage("Password must be at most 30 characters long"),
  check("avatar")
    .exists()
    .withMessage("Avatar is required")
    .notEmpty()
    .withMessage("Avatar must not be empty")
    .isString()
    .withMessage("Avatar must be a string")
    .matches(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|png)/)
    .withMessage("Avatar must be a valid url"),
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
  check("status_lock")
    .exists()
    .withMessage("Status lock is required")
    .notEmpty()
    .withMessage("Status lock must not be empty")
    .isBoolean()
    .withMessage("Status lock must be a boolean"),
  check("country")
    .exists()
    .withMessage("Country is required")
    .notEmpty()
    .withMessage("Country must not be empty")
    .isInt()
    .withMessage("Country must be a number"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const signinValidator = [
  check("username")
    .exists()
    .withMessage("Username is required")
    .notEmpty()
    .withMessage("Username must not be empty")
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 5 })
    .withMessage("Username must be at least 5 characters long")
    .isLength({ max: 20 })
    .withMessage("Username must be at most 20 characters long")
    .custom(async (value) => {
      const user = await sql`SELECT * FROM users WHERE username = ${value}`;

      if (!user[0]) {
        throw new Error("Username not found");
      }
    }),
  check("pass")
    .exists()
    .withMessage("Password is required")
    .notEmpty()
    .withMessage("Password must not be empty")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long")
    .isLength({ max: 30 })
    .withMessage("Password must be at most 30 characters long")
    .custom(async (value, { req }) => {
      const user =
        await sql`SELECT * FROM users WHERE username = ${req.body.username}`;
      if (user[0]) {
        const match = await comparePassword(value, user[0].pass);
        if (!match) {
          throw new Error("Wrong password");
        }
      }
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
