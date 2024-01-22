import sql from "../db.js";

export const getCollections = async (req, res) => {
  try {
    const collection =
      await sql`SELECT * FROM collection WHERE user_id = ${req.user_id}`;

    if (!collection[0])
      return res
        .status(404)
        .json({ success: false, message: "Collection not found" });

    res.status(200).json({ success: true, collection });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCollection = async (req, res) => {
  const { id } = req.params;
  try {
    const collection =
      await sql`SELECT * FROM collection WHERE collection_id = ${id}`;

    if (!collection[0])
      return res
        .status(404)
        .json({ success: false, message: "Collection not found" });

    res.status(200).json({ success: true, collection: collection[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCollection = async (req, res) => {
  const { title } = req.body;
  try {
    const collection =
      await sql`INSERT INTO collection (user_id, created_on, title) VALUES (${req.user_id}, NOW(), ${title}) RETURNING *`;

    res.status(201).json({ success: true, collection: collection[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCollection = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const collection =
      await sql`UPDATE collection SET title = ${title} WHERE collection_id = ${id} RETURNING *`;

    if (!collection[0])
      return res
        .status(404)
        .json({ success: false, message: "Collection not found" });

    res.status(200).json({ success: true, collection: collection[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCollection = async (req, res) => {
  const { id } = req.params;
  try {
    const collection =
      await sql`DELETE FROM collection WHERE collection_id = ${id} RETURNING *`;

    if (!collection[0])
      return res
        .status(404)
        .json({ success: false, message: "Collection not found" });

    res.status(201).json({ success: true, message: "Collection deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
