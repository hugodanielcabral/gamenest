import { existsAndNotEmpty } from "../helpers/handleExistsAndNotEmpty.js";
import { validateResult } from "../helpers/handleValidateResult.js";
import { comparePassword } from "../helpers/handleBcrypt.js";
import sql from "../db.js";
import { check } from "express-validator";

export const signupValidator = [
  existsAndNotEmpty("username", "Username")
    .isString()
    .withMessage("El nombre de usuario debe ser texto")
    .isLength({ min: 5 })
    .withMessage("El nombre de usuario debe tener al menos 5 caracteres")
    .isLength({ max: 20 })
    .withMessage("El nombre de usuario debe tener como máximo 20 caracteres")
    .custom(async (value) => {
      const user = await sql`SELECT * FROM users WHERE username = ${value}`;
      if (user.length > 0) {
        throw new Error("El nombre de usuario ya está en uso");
      }
    }),
  existsAndNotEmpty("email", "Email")
    .isEmail()
    .withMessage("El email debe ser un email válido")
    .isLength({ max: 60 })
    .withMessage("El email debe tener como máximo 60 caracteres")
    .custom(async (value) => {
      const user = await sql`SELECT * FROM users WHERE email = ${value}`;
      if (user.length > 0) {
        throw new Error("El email ya está en uso");
      }
    }),
  existsAndNotEmpty("pass", "Password")
    .isString()
    .withMessage("La contraseña debe ser texto")
    .isLength({ min: 5 })
    .withMessage("La contraseña debe tener al menos 5 caracteres")
    .isLength({ max: 30 })
    .withMessage("La contraseña debe tener como máximo 30 caracteres"),
  check("birthday").optional(),
  /* .isDate()
    .withMessage("Birthday must be a valid date") */ existsAndNotEmpty(
    "avatar",
    "Avatar"
  )
    .optional()
    .isString()
    .withMessage("El avatar debe ser una url válida")
    .matches(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|png)/)
    .withMessage(
      "El avatar debe ser una url válida que termine en .jpg, .jpeg o .png"
    ),
  check("title")
    .optional()
    .isString()
    .withMessage("El título debe ser texto")
    .isLength({ min: 3 })
    .withMessage("El título debe tener al menos 3 caracteres")
    .isLength({ max: 30 })
    .withMessage("El título debe tener como máximo 30 caracteres"),
  check("status_lock")
    .optional()
    .isBoolean()
    .withMessage("El estado de bloqueo debe ser un booleano"),
  existsAndNotEmpty("country", "Country")
    .isInt()
    .withMessage("Oops something went wrong, please try again later"),
  existsAndNotEmpty("repass", "Repeat password").custom((value, { req }) => {
    if (value !== req.body.pass) {
      throw new Error("Las contraseñas no coinciden");
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
    .withMessage("Nombre de usuario o contraseña invalidos.")
    .isLength({ min: 5, max: 30 })
    .withMessage("Nombre de usuario o contraseña invalidos.")
    .custom(async (value) => {
      const user = await sql`SELECT * FROM users WHERE username = ${value}`;
      if (!user[0]) {
        throw new Error("Nombre de usuario o contraseña invalidos.");
      }
    }),
  check("pass")
    .isString()
    .withMessage("Nombre de usuario o contraseña invalidos.")
    .isLength({ min: 5, max: 20 })
    .withMessage("Nombre de usuario o contraseña invalidos.")
    .custom(async (value, { req }) => {
      const user =
        await sql`SELECT * FROM users WHERE username = ${req.body.username}`;
      if (user.length > 0) {
        const match = await comparePassword(value, user[0].pass);
        if (!match) {
          throw new Error("Nombre de usuario o contraseña invalidos.");
        }
      }
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
