import sql from "../db.js";
import { getGameInfoFromCollection } from "../utils/getGameInfoFromCollection.js";

export const getCollections = async (req, res) => {
  try {
    const collection = await sql`SELECT * FROM collection`;

    console.log(collection);

    if (!collection[0])
      return res.status(404).json({ message: "Collection not found" });

    res.status(200).json(collection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getCollection = async (req, res) => {
  try {
    const collection =
      await sql`SELECT * FROM collection WHERE user_id = ${req.user_id}`;

    if (!collection[0])
      return res.status(404).json({ message: "Collection not found" });

    const collectionWithGameInfo = await getGameInfoFromCollection(collection);

    res.status(200).json(collectionWithGameInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const addGameToCollection = async (req, res) => {
  const {
    game_id,
    game_slug,
    game_name,
    game_cover,
    platform,
    format,
    ownership,
    store,
    status,
    progress_note,
  } = req.body;

  try {
    const collection =
      await sql`INSERT INTO collection (game_id, game_slug, game_name, game_cover, platform_name, format_name, ownership_name, store_name, status_name, progress_note, user_id) VALUES (${game_id}, ${game_slug}, ${game_name}, ${game_cover}, ${platform}, ${format}, ${ownership}, ${store}, ${status}, ${progress_note}, ${req.user_id}) RETURNING *`;

    res.status(201).json(collection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateGameFromCollection = async (req, res) => {
  const { id } = req.params;

  //* I don't need to pass the body parts like "game_id, game_slug, game_name, etc. Because postgres will only update the fields that are passed in the body using the ${sql(req.body)} syntax."

  try {
    const collection = await sql`
      UPDATE collection 
        SET ${sql(req.body)} 
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

    res.status(204).json(collection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
