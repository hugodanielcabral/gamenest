import sql from "../db.js";

export const getCollectionUsers = async (req, res) => {
  try {
    const collection_user = await sql`SELECT * FROM collection_user`;

    res.status(200).json({ success: true, collection_user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCollectionByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const collection_user =
      await sql`SELECT * FROM collection_user WHERE collection_user_id = ${id}`;

    if (!collection_user[0])
      return res
        .status(404)
        .json({ success: false, message: "Collection not found" });

    res.status(200).json({ success: true, collection_user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCollectionUser = async (req, res) => {
  const { ownership, status, game_id, collection_id } = req.body;
  try {
    const collection_exists =
      await sql`SELECT * FROM collection WHERE collection_id = ${collection_id}`;

    if (!collection_exists[0])
      return res
        .status(404)
        .json({ success: false, message: "Collection not found" });

    const collection_user =
      await sql`INSERT INTO collection_user (ownership, status, game_id, collection_id) VALUES (${ownership}, ${status}, ${game_id}, ${collection_id}) RETURNING *`;

    res
      .status(201)
      .json({ success: true, collection_user: collection_user[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCollectionUser = async (req, res) => {
  const { id } = req.params;
  const { ownership, status, game_id, collection_id } = req.body;
  try {
    const collection_user =
      await sql`UPDATE collection_user SET ownership = ${ownership}, status = ${status}, game_id = ${game_id}, collection_id = ${collection_id} WHERE collection_user_id = ${id} RETURNING *`;

    if (!collection_user[0])
      return res
        .status(404)
        .json({ success: false, message: "Collection not found" });

    res
      .status(200)
      .json({ success: true, collection_user: collection_user[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCollectionUser = async (req, res) => {
  const { id } = req.params;
  try {
    const collection_user =
      await sql`DELETE FROM collection_user WHERE collection_user_id = ${id} RETURNING *`;

    if (!collection_user[0])
      return res
        .status(404)
        .json({ success: false, message: "Collection not found" });

    res.status(204);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
