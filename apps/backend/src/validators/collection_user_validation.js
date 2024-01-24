import { existsAndNotEmpty } from "../helpers/handleExistsAndNotEmpty.js";
import { validateResult } from "../helpers/handleValidateResult.js";
import sql from "../db.js";

export const createCollectionUserValidator = [
  existsAndNotEmpty("ownership", "Ownership")
    .isString()
    .withMessage("Ownership must be a String")
    .custom(async (value) => {
      const ownership = [
        "Owned",
        "Shared",
        "Subscription",
        "Borrowed",
        "Rented",
        "Other",
      ];

      if (!ownership.includes(value)) {
        throw new Error("Invalid ownership");
      }
    }),
  existsAndNotEmpty("status", "Status")
    .isString()
    .withMessage("Status must be a String")
    .custom(async (value) => {
      const status = ["No status", "Unplayed", "Playing", "Played"];

      if (!status.includes(value)) {
        throw new Error("Invalid status");
      }
    }),
  existsAndNotEmpty("game_id", "Game id")
    .isInt()
    .withMessage("Game id must be a number")
    .custom(async (value, { req }) => {
      const { collection_id } = req.body;
      const gameInCollection =
        await sql`SELECT * FROM collection_user WHERE collection_id = ${collection_id} AND game_id = ${value};`;

      if (gameInCollection[0]) {
        throw new Error("Game already in collection");
      }
    }),
  existsAndNotEmpty("collection_id", "Collection id")
    .isInt()
    .withMessage("Collection id must be a number"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const updateCollectionUserValidator = [
  existsAndNotEmpty("ownership", "Ownership")
    .isString()
    .withMessage("Ownership must be a String")
    .custom(async (value) => {
      const ownership = [
        "Owned",
        "Shared",
        "Subscription",
        "Borrowed",
        "Rented",
        "Other",
      ];

      if (!ownership.includes(value)) {
        throw new Error("Invalid ownership");
      }
    }),
  existsAndNotEmpty("status", "Status")
    .isString()
    .withMessage("Status must be a String")
    .custom(async (value) => {
      const status = ["No status", "Unplayed", "Playing", "Played"];

      if (!status.includes(value)) {
        throw new Error("Invalid status");
      }
    }),
  existsAndNotEmpty("game_id", "Game id")
    .isInt()
    .withMessage("Game id must be a number")
    .custom(async (value, { req }) => {
      const { collection_id } = req.body;
      const gameInCollection =
        await sql`SELECT * FROM collection_user WHERE collection_id = ${collection_id} AND game_id = ${value};`;

      if (gameInCollection[0]) {
        throw new Error("Game already in collection");
      }
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
