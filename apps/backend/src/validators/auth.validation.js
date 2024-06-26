import { validateResult } from "../helpers/handleValidateResult.js";
import sql from "../db.js";
import { body, check, param, query } from "express-validator";
import { comparePassword } from "../helpers/handleBcrypt.js";
import { tokenValidation } from "../utils/email.js";

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

export const verifyUserValidator = [
  param("token").custom(async (value) => {
    const decodedToken = await tokenValidation(value);

    if (!decodedToken) throw new Error("Token invalido.");

    const { email, verificationToken } = decodedToken;

    const verifyUserExistence =
      await sql`SELECT * FROM users WHERE email = ${email}`;

    if (!verifyUserExistence[0]) throw new Error("El usuario no existe.");

    const verifyTokenExistence =
      await sql`SELECT * FROM verification_tokens WHERE token = ${verificationToken} AND used = FALSE`;

    if (!verifyTokenExistence[0]) throw new Error("El token ya fue usado.");
  }),
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

      console.log(userPassword);

      if (userPassword.length <= 0) throw new Error("Contraseña incorrecta.");

      const match = await comparePassword(value, userPassword[0].password);

      if (!match) throw new Error("Contraseña incorrecta.");
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const updateProfileValidator = [
  body("birthday").custom((value) => {
    const date = new Date(value).getFullYear();
    const currentDate = new Date().getFullYear();
    if (currentDate - date < 7) throw new Error("Debes ser mayor de 7 años.");

    if (currentDate - date > 100)
      throw new Error("Debes ser menor de 100 años.");

    return true;
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
