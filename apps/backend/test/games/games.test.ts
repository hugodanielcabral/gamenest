import { describe, it, before } from "node:test";
import assert from "node:assert";

let Games: any;

before(async () => {
  await import("../../src/loadEnv");
  const module = await import("../../src/models/games.model");
  Games = module.default;
});

describe("Games Controller", () => {
  describe("Get all Games", { skip: true }, () => {
    it("Should return an array of Games", async () => {
      const games = await Games.findAll();

      assert.ok(Array.isArray(games), "The response was not an array.");
      assert.ok(games && games.length > 0, "The array is empty.");
    });

    it("Should return games data with valid game objects containing id and name properties", async () => {
      const games = await Games.findAll();

      assert.ok(games && games[0].result, "Games array was not found.");

      const result = games[0].result;
      assert.ok(result[0].id != null, "The element does not have an id");
      assert.ok(result[0].name != null, "The element does not have a name");
    });
  });
  describe("Get a Game", { skip: false }, () => {
    it("Should return a object of a Game", async () => {
      // Arrange
      const gameSlug = "rematch--1";

      // Act
      const game = await Games.findById(gameSlug);

      // Assert
      assert.ok(game, "The response wasn't an object.");
    });
  });
});