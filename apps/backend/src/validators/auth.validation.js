import sql from "../db.js";
import { validateResult } from "../helpers/handleValidateResult.js";
import { body } from "express-validator";
import { encryption } from "../helpers/handleEncryption.js";

export const signupValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Debes ingresar un nombre de usuario.")
    .isLength({ min: 6, max: 30 })
    .withMessage("El nombre de usuario debe tener entre 6 a 30 caracteres.")
    .matches("^[a-zA-Z0-9]+$")
    .withMessage("El nombre de usuario solo permite letras y números.")
    .custom(async (value) => {
      const user = await sql`SELECT * FROM users WHERE username = ${value}`;
      if (user.length) {
        throw new Error("El nombre de usuario ya esta en uso.");
      }
    }),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Debes ingresar un email.")
    .isEmail()
    .withMessage("Debes ingresar un email valido")
    .custom(async (value) => {
      const email = await sql`SELECT email FROM users WHERE email = ${value}`;
      console.log(email);

      if (email.length) throw new Error("El email ya está en uso.");
    }),
  body("country_id")
    .trim()
    .notEmpty()
    .withMessage("Debes seleccionar un país."),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Debes ingresar una contraseña")
    .isLength({
      min: 6,
      max: 20,
    })
    .withMessage("La contraseña debe tener entre 6 y 20 caracteres.")
    .custom((value, { req }) => value === req.body.repassword)
    .withMessage("Las contraseñas no coinciden."),
  body("repassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Las contraseñas no coinciden."),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const signinValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Debes ingresar un nombre de usuario.")
    .custom(async (value) => {
      const username = await sql`SELECT * FROM users WHERE username = ${value}`;
      if (!username.length) throw new Error("El usuario no existe.");
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Debes ingresar una contraseña.")
    .custom(async (value, { req }) => {
      const userPassword =
        await sql`SELECT * FROM users WHERE username = ${req.body.username}`;

      if (userPassword.length <= 0) throw new Error("Contraseña incorrecta.");

      const match = await encryption.compare(value, userPassword[0].password);

      if (!match) throw new Error("Contraseña incorrecta.");
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
