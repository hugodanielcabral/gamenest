import sql from "../db.js";

export const getCollections = async (req, res) => {
  try {
    const collection =
      await sql`SELECT * FROM collection WHERE user_id = ${req.user_id}`;

    if (!collection[0])
      return res.status(404).json({ message: "Collection not found" });

    res.status(200).json({ collection });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

    res.status(200).json({ collection: collection[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCollection = async (req, res) => {
  const { title, color, description, category } = req.body;
  console.log(title, color, description, category, req.user_id);
  try {
    const collection =
      await sql`INSERT INTO collection (user_id, created_on, title, color, description) VALUES (${req.user_id}, NOW(), ${title}, ${color}, ${description}, ${category}) RETURNING *`;

    res.status(201).json({ collection: collection[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCollection = async (req, res) => {
  const { id } = req.params;
  const { title, color, description, category } = req.body;
  try {
    const collection =
      await sql`UPDATE collection SET title = ${title}, color = ${color}, description = ${description}, category = ${category} WHERE collection_id = ${id} RETURNING *`;

    if (!collection[0])
      return res.status(404).json({ message: "Collection not found" });

    res.status(200).json({ collection: collection[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCollection = async (req, res) => {
  const { id } = req.params;
  try {
    const collection =
      await sql`DELETE FROM collection WHERE collection_id = ${id} RETURNING *`;

    if (!collection[0])
      return res.status(404).json({ message: "Collection not found" });

    res.status(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
