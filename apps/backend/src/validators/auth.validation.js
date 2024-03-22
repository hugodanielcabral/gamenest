import { existsAndNotEmpty } from "../helpers/handleExistsAndNotEmpty.js";
import { validateResult } from "../helpers/handleValidateResult.js";
import { comparePassword } from "../helpers/handleBcrypt.js";
import sql from "../db.js";
import { check } from "express-validator";

export const signupValidator = [
  existsAndNotEmpty("username", "Username")
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
  existsAndNotEmpty("email", "Email")
    .isEmail()
    .withMessage("Email must be a valid email")
    .isLength({ max: 60 })
    .withMessage("Email must be at most 60 characters long")
    .custom(async (value) => {
      const user = await sql`SELECT * FROM users WHERE email = ${value}`;
      if (user.length > 0) {
        throw new Error("Email already in use");
      }
    }),
  existsAndNotEmpty("pass", "Password")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long")
    .isLength({ max: 30 })
    .withMessage("Password must be at most 30 characters long"),
  check("birthday").optional(),
  /* .isDate()
    .withMessage("Birthday must be a valid date") */ existsAndNotEmpty(
    "avatar",
    "Avatar"
  )
    .isString()
    .withMessage("Avatar must be a string")
    .matches(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|png)/)
    .withMessage("Avatar must be a valid url"),
  check("title")
    .optional()
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long")
    .isLength({ max: 30 })
    .withMessage("Title must be at most 30 characters long"),
  check("status_lock").isBoolean().withMessage("Status lock must be a boolean"),
  existsAndNotEmpty("country_id", "Country")
    .isInt()
    .withMessage("Oops something went wrong, please try again later"),
  existsAndNotEmpty("repass", "Repeat password").custom((value, { req }) => {
    if (value !== req.body.pass) {
      throw new Error("Passwords must match");
    }
    return true;
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const signinValidator = [
  check("username")
    .isString()
    .withMessage("Invalid username or password.")
    .isLength({ min: 5, max: 30 })
    .withMessage("Invalid username or password.")
    .custom(async (value) => {
      const user = await sql`SELECT * FROM users WHERE username = ${value}`;
      if (!user[0]) {
        throw new Error("Invalid username or password.");
      }
    }),
  check("pass")
    .isString()
    .withMessage("Invalid username or password.")
    .isLength({ min: 5, max: 20 })
    .withMessage("Invalid username or password.")
    .custom(async (value, { req }) => {
      const user =
        await sql`SELECT * FROM users WHERE username = ${req.body.username}`;
      if (user.length > 0) {
        const match = await comparePassword(value, user[0].pass);
        if (!match) {
          throw new Error("Invalid username or password.");
        }
      }
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
