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

export const getPublicListsById = async (req, res) => {
  const { id } = req.params;
  const { order = "asc", page = 1 } = req.query;
  try {
    const list = await sql`
            SELECT 
          l.*,
          COALESCE(lg.total_games, 0) AS total_games,
          COALESCE(lk.total_likes, 0) AS total_likes
      FROM 
          lists l
      LEFT JOIN (
          SELECT list_id, COUNT(*) AS total_games
          FROM list_games
          GROUP BY list_id
      ) lg ON l.list_id = lg.list_id
      LEFT JOIN (
          SELECT likeable_id, COUNT(*) AS total_likes
          FROM likes
          WHERE likeable_type = 'list'
          GROUP BY likeable_id
      ) lk ON l.list_id = lk.likeable_id
      WHERE 
          l.list_id = ${id}
          AND l.visibility = TRUE;
    `;

    if (!list.length) {
      return res.status(404).json({ message: "No se encontró la lista." });
    }

    const games = await sql`
            SELECT *
      FROM list_games
      WHERE list_id = ${id}
      ORDER BY game_name ${order === "asc" ? sql`ASC` : sql`DESC`}
        OFFSET ${(page - 1) * 12}
        LIMIT 12
      ;
    `;

    return res.status(200).json({
      list: list[0],
      games,
    });
  } catch (error) {
    console.error("Error al obtener lista pública por ID:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getPrivateLists = async (req, res) => {
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
          l.visibility = FALSE
          AND l.user_id = ${req.user_id}
          AND LOWER(l.title) LIKE ${`%${q}%`}
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
    console.error("Error al obtener listas privadas:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getPrivateListsById = async (req, res) => {
  const { id } = req.params;
  const { order = "asc", page = 1 } = req.query;
  try {
    const list = await sql`
        SELECT
        l.*,
        COALESCE(lg.total_games, 0) AS total_games,
        COALESCE(lk.total_likes, 0) AS total_likes
    FROM
        lists l
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
        l.list_id = ${id}
        AND l.visibility = FALSE
        AND user_id = ${req.user_id};
    `;

    if (!list.length) {
      return res.status(404).json({ message: "No se encontró la lista." });
    }

    const games = await sql`
            SELECT *
      FROM list_games
      WHERE list_id = ${id}
      ORDER BY game_name ${order === "asc" ? sql`ASC` : sql`DESC`}
        OFFSET ${(page - 1) * 12}
        LIMIT 12
      ;
    `;

    return res.status(200).json({
      list: list[0],
      games,
    });
  } catch (error) {
    console.error("Error al obtener lista privada por ID:", error);
    res.status(500).json({ message: error.message });
  }
};

export const addList = async (req, res) => {
  try {
    const { title, description, visibility, games } = req.body;

    await sql.begin(async (sql) => {
      const insertedList = await sql`
        INSERT INTO lists (title, description, user_id, visibility) 
        VALUES (${title}, ${description}, ${req.user_id}, ${visibility})
        RETURNING list_id;
      `;

      if (!insertedList.length) {
        throw new Error("Error al crear la lista.");
      }

      const gamesData = games.map((game) => ({
        ...game,
        list_id: insertedList[0].list_id,
      }));

      const insertedGames = await sql`
        INSERT INTO list_games ${sql(gamesData)};
      `;

      if (!insertedGames) {
        throw new Error("Error al agregar juegos a la lista.");
      }

      res.status(201).json({
        message: "Lista y juegos agregados correctamente.",
        list_id: insertedList[0].list_id,
      });
    });
  } catch (error) {
    console.error("Error al agregar lista:", error);
    res.status(500).json({ message: error.message });
  }
};
