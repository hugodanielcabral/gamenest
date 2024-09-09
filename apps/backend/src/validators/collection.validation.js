import { validateResult } from "../helpers/handleValidateResult.js";
import { body } from "express-validator";

export const addCollectionValidator = [
  body("hours_played")
    .optional()
    .custom((value) => value >= 0)
    .withMessage("Horas jugadas no puede ser un número negativo.")
    .custom((value) => value <= 99999)
    .withMessage("Horas jugadas no puede ser mayor a 99999."),
  body("minutes_played")
    .optional()
    .custom((value) => value >= 0)
    .withMessage("Minutos jugados no puede ser un número negativo.")
    .custom((value) => value <= 60)
    .withMessage("Minutos jugados no puede ser mayor a 60."),
  body("amount_paid")
    .optional()
    .custom((value) => value >= 0)
    .withMessage("El monto pagado no puede ser un número negativo."),
  body("start_date")
    .optional()
    .customSanitizer((value) => {
      if (!value) return null;
      return value;
    }),
  body("finish_date")
    .optional()
    .customSanitizer((value) => {
      if (!value) return null;

      return value;
    })
    .custom((value, { req }) => {
      if (req.body.start_date && value < req.body.start_date) {
        throw new Error(
          "Fecha de finalización no puede ser menor que la fecha de inicio."
        );
      }
      return true;
    }),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];
