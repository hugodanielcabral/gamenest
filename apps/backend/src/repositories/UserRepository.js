import sql from "../db.js";

export const UserRepository = {
  async findUserById(id) {
    const result = await sql`SELECT * FROM users WHERE user_id = ${id}`;

    return result;
  },

  async findUserByUsername(username) {
    const result = await sql`SELECT * FROM users WHERE username LIKE ${
      username + "%"
    };`;

    return result;
  },

  async create(data) {
    const result =
      await sql`INSERT INTO users (username, email, password, country_id) VALUES (${
        data.username
      }, ${data.email}, ${data.encryptedPassword}, ${parseInt(
        data.country_id
      )}) RETURNING *;`;

    return result;
  },
};
