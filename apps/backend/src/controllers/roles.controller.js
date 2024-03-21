import sql from "../db.js";

export const getRoles = async (req, res) => {
  try {
    const roles = await sql`SELECT * FROM roles`;

    res.status(200).json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getRole = async (req, res) => {
  try {
    const { id } = req.params;

    const roleExists = await sql`SELECT * FROM roles WHERE role_id = ${id}`;

    if (!roleExists[0])
      return res.status(404).json({ error: "Role not found" });

    res.status(200).json(roleExists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const createRole = async (req, res) => {
  try {
    const { name } = req.body;

    const newRole =
      await sql`INSERT INTO roles(name) VALUES(${name}) RETURNING *`;

    res.status(201).json(newRole);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedRole =
      await sql`UPDATE roles SET name = ${name} WHERE role_id = ${id} RETURNING *`;

    if (!updatedRole[0])
      return res.status(404).json({ error: "Role not found" });

    res.status(200).json(updatedRole);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRole =
      await sql`DELETE FROM roles WHERE role_id = ${id} RETURNING *`;

    if (!deletedRole[0])
      return res.status(404).json({ error: "Role not found" });

    res.status(200).json(deletedRole);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
