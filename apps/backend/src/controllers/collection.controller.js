import sql from "../db.js";
import { getGamesFromUser } from "../controllers/games.controller.js";
import mapCollections from "../helpers/mapCollections.js";

export const getCollections = async (req, res) => {
  try {
    const collection = await sql`SELECT * FROM collection`;

    if (!collection[0])
      return res.status(404).json({ message: "Collection not found" });

    res.status(200).json(collection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getCollectionFromUser = async (req, res) => {
  const { id } = req.params;
  try {
    const collection =
      await sql`SELECT * FROM collection WHERE collection_id = ${id}`;

    if (!collection[0])
      return res.status(404).json({ message: "Collection not found" });

    res.status(200).json(collection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllGamesFromUser = async (req, res) => {
  try {
    const { page } = req.query;

    const collection =
      await sql`SELECT * FROM collection WHERE user_id = ${req.user_id}`;

    if (!collection[0])
      return res.status(404).json({ message: "Collection not found" });

    const games = await getGamesFromUser(collection);

    const fullData = await mapCollections(collection, games);

    res.status(200).json(fullData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const addGameToCollection = async (req, res) => {
  const { game_id, game_slug, platform, ownership, status, progress_note } =
    req.body;
  console.log(req.body);
  console.log(req.user_id);
  try {
    const collection =
      await sql`INSERT INTO collection (game_id, game_slug, platform, ownership, status, progress_note, user_id) VALUES (${game_id}, ${game_slug}, ${platform}, ${ownership}, ${status}, ${progress_note}, ${req.user_id}) RETURNING *`;

    res.status(201).json(collection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateGameFromCollection = async (req, res) => {
  const { id } = req.params;
  const { platform, ownership, status, progress_note } = req.body;

  try {
    const collection = await sql`
      UPDATE collection 
      SET 
        platform = COALESCE(${platform}, platform),
        ownership = COALESCE(${ownership}, ownership),
        status = COALESCE(${status}, status),
        progress_note = COALESCE(${progress_note}, progress_note)
      WHERE collection_id = ${id} 
      RETURNING *`;

    if (!collection[0])
      return res.status(404).json({ message: "Collection not found" });

    res.status(200).json(collection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteGameFromCollection = async (req, res) => {
  const { id } = req.params;
  try {
    const collection =
      await sql`DELETE FROM collection WHERE collection_id = ${id} RETURNING *`;

    if (!collection[0])
      return res.status(404).json({ message: "Collection not found" });

    console.log(collection);

    res.status(204).json(collection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
