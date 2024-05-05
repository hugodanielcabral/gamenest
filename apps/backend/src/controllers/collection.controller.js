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
  const {
    game_id,
    game_slug,
    game_name,
    game_cover,
    platform_name,
    format_name,
    ownership_name,
    store_name,
    status_name,
    completed_date,
    progress_note,
    hours_played,
    rating,
    amount_paid,
    favorite,
  } = req.body;

  try {
    const collection = await sql`
      UPDATE collection 
      SET 
        game_id = COALESCE(${game_id}, game_id),
        game_slug = COALESCE(${game_slug}, game_slug),
        game_name = COALESCE(${game_name}, game_name),
        game_cover = COALESCE(${game_cover}, game_cover),
        platform_name = COALESCE(${platform_name}, platform_name),
        format_name = COALESCE(${format_name}, format_name),
        ownership_name = COALESCE(${ownership_name}, ownership_name),
        store_name = COALESCE(${store_name}, store_name),
        status_name = COALESCE(${status_name}, status_name),
        completed_date = COALESCE(${completed_date}, completed_date),
        progress_note = COALESCE(${progress_note}, progress_note),
        hours_played = COALESCE(${hours_played}, hours_played),
        rating = COALESCE(${rating}, rating),
        amount_paid = COALESCE(${amount_paid}, amount_paid),
        favorite = COALESCE(${favorite}, favorite)
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

export const updateRating = async (req, res) => {
  const { id } = req.params;

  const { rating } = req.body;
  console.log(rating);

  try {
    const collection =
      await sql`UPDATE collection SET rating = ${rating} WHERE collection_id = ${id} RETURNING *`;

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
