import sql from "../db.js";

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

export const getAllGamesFromUser = async (req, res) => {
  try {
    const collection =
      await sql`SELECT * FROM collection WHERE user_id = ${req.user_id}`;

    if (!collection[0])
      return res.status(404).json({ message: "Collection not found" });

    res.status(200).json(collection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const addGameToCollection = async (req, res) => {
  const { game_id, platform, ownership, status, progress, progress_note } =
    req.body;
  try {
    const collection =
      await sql`INSERT INTO collection (game_id, platform, ownership, status, progress, progress_note, user_id) VALUES (${game_id}, ${platform}, ${ownership}, ${status}, ${progress}, ${progress_note}, ${req.body.user_id}) RETURNING *`;

    res.status(201).json(collection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateGameFromCollection = async (req, res) => {
  const { id } = req.params;
  const { platform, ownership, status, progress, progress_note } = req.body;

  try {
    const collection = await sql`
      UPDATE collection 
      SET 
        platform = COALESCE(${platform}, platform),
        ownership = COALESCE(${ownership}, ownership),
        status = COALESCE(${status}, status),
        progress = COALESCE(${progress}, progress),
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

    res.status(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
