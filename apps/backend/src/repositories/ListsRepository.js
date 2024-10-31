import sql from "../db.js";

export const ListRepository = {
  async create(data) {
    const result = await sql`
            INSERT INTO lists (title, description, user_id, visibility) 
            VALUES (${data.title}, ${data.description}, ${data.user_id}, ${data.visibility})
            RETURNING list_id;
        `;
    return result;
  },

  async update(data, id) {
    const result = await sql`UPDATE lists 
        SET title = ${data.title}, description = ${data.description}, visibility = ${data.visibility}, updated_on = 'NOW()'
        WHERE list_id = ${id}`;

    return result;
  },

  async delete(id) {
    const result = sql`
    DELETE FROM lists
    WHERE list_id = ${id}
    RETURNING *;
  `;

    return result;
  },
};
