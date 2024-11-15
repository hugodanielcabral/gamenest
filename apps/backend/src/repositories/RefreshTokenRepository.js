import sql from "../db.js";

export const RefreshTokenRepository = {
  async findOne(id, token) {
    const result =
      await sql`SELECT * FROM refresh_tokens WHERE user_id = ${id} AND token = ${token};`;
    return result;
  },

  async create(data) {
    const result =
      await sql`INSERT INTO refresh_tokens (token, expire_date, user_id) VALUES (${data.refreshToken}, ${data.expireDate}, ${data.user_id}
      ) RETURNING *;`;

    return result;
  },

  async update(data) {
    const result =
      await sql`UPDATE refresh_tokens SET token = ${data.refreshToken}, expire_date= ${data.expireDate} WHERE user_id = ${data.user_id};`;

    return result;
  },
};
