import { existsAndNotEmpty } from "../helpers/handleExistsAndNotEmpty.js";
import { validateResult } from "../helpers/handleValidateResult.js";
import { comparePassword } from "../helpers/handleBcrypt.js";
import sql from "../db.js";

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
      if (user[0]) {
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
  existsAndNotEmpty("avatar", "Avatar")
    .isString()
    .withMessage("Avatar must be a string")
    .matches(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|png)/)
    .withMessage("Avatar must be a valid url"),
  existsAndNotEmpty("title", "Title")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long")
    .isLength({ max: 30 })
    .withMessage("Title must be at most 30 characters long"),
  existsAndNotEmpty("status_lock", "Status lock")
    .isBoolean()
    .withMessage("Status lock must be a boolean"),
  existsAndNotEmpty("country", "Country")
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
  existsAndNotEmpty("username", "Username")
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
  existsAndNotEmpty("pass", "Password")
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
