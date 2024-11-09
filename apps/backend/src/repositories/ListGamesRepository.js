import sql from "../db.js";

export const ListGamesRepository = {
  async findById(id) {
    const result = await sql`
    SELECT game_id FROM list_games WHERE list_id = ${id}
  `;

    return result;
  },

  async createMany(gamesData) {
    const result = await sql`
            INSERT INTO list_games ${sql(
              gamesData,
              "list_id",
              "game_id",
              "game_slug",
              "game_name",
              "game_cover"
            )};`;

    return result;
  },

  async deleteMany(gamesData, id) {
    const result = await sql`
    DELETE FROM list_games 
    WHERE list_id = ${id} 
    AND list_games_id = ANY(${gamesData});
  `;

    return result;
  },
};
