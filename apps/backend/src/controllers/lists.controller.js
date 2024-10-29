import sql from "../db.js";

export const getPublicLists = async (req, res) => {
  const { order = "asc", sort = "l.created_on", q = "", page = 1 } = req.query;

  try {
    const lists = await sql`
        SELECT
            l.*,
            u.username,
            COALESCE(lg.total_games, 0) AS total_games,
            COALESCE(lk.total_likes, 0) AS total_likes
        FROM
            lists l
            LEFT JOIN users u ON l.user_id = u.user_id
            LEFT JOIN (
                SELECT
                    list_id,
                    COUNT(*) AS total_games
                FROM
                    list_games
                GROUP BY
                    list_id
            ) lg ON l.list_id = lg.list_id
            LEFT JOIN (
                SELECT
                    likeable_id,
                    COUNT(*) AS total_likes
                FROM
                    likes
                WHERE
                    likeable_type = 'list'
                GROUP BY
                    likeable_id
            ) lk ON l.list_id = lk.likeable_id
        WHERE
            l.visibility = TRUE AND LOWER(l.title) LIKE ${`%${q}%`}
        ORDER BY ${sql(sort)} ${order === "asc" ? sql`ASC` : sql`DESC`}
        OFFSET ${(page - 1) * 12}
        LIMIT 12;
      `;

    if (!lists.length) {
      return res.status(404).json({ message: "No se encontraron listas." });
    }

    // Obtengo los IDs de las listas para buscar los juegos
    const listIds = lists.map((list) => list.list_id);

    const games = await sql`
        SELECT *
        FROM list_games
        WHERE list_id = ANY(${listIds})
        ORDER BY game_name ASC
        LIMIT 3;
      `;

    res.status(200).json({ lists, games });
  } catch (error) {
    console.error("Error al obtener listas públicas:", error);
    res.status(500).json({ message: error.message });
  }
};
