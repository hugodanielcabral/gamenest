import { query } from "express-validator";
import { validateResult } from "../helpers/handleValidateResult.js";
import { body } from "express-validator";
import { availablePlatforms } from "../data/availablePlatforms.js";

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

export const getCollectionValidator = [
  query("status")
    .optional()
    .customSanitizer((value) => {
      const validStatus = [
        "Sin estado",
        "Jugando",
        "Completado",
        "Pendiente",
        "Abandonado",
      ];

      const splitArray = value.split(",");

      const filteredStatus = splitArray.filter((item) => {
        const matchingStatus = validStatus.find((status) => status === item);

        return matchingStatus;
      });

      if (filteredStatus.length === 0) return "";

      return filteredStatus.join(",");
    }),
  query("ownership")
    .optional()
    .customSanitizer((value) => {
      const validOwnership = [
        "Comprado",
        "Compartido",
        "Suscripción",
        "Alquilado",
        "Sin licencia",
        "Otro",
      ];

      const splitArray = value.split(",");

      const filteredOwnership = splitArray.filter((item) => {
        const matchingOwnership = validOwnership.find(
          (ownership) => ownership === item
        );

        return matchingOwnership;
      });

      if (filteredOwnership.length === 0) return "";

      return filteredOwnership.join(",");
    }),
  query("platforms")
    .optional()
    .customSanitizer((value) => {
      const splitArray = value.split(",");

      const filteredPlatforms = splitArray.filter((item) => {
        const matchingPlatform = availablePlatforms.find((platform) => {
          if (item === "PC (Microsoft Windows)") {
            return platform.title === "Windows PC";
          }

          return platform.title === item;
        });

        return matchingPlatform.value;
      });

      if (filteredPlatforms.length === 0) return "";

      return filteredPlatforms.join(",");
    }),
  query("favorites").optional().isBoolean(),
  query("q").optional().isString(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
