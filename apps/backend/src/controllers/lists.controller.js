import sql from "../db.js";
import { ListGamesRepository } from "../repositories/ListGamesRepository.js";
import { ListRepository } from "../repositories/ListsRepository.js";

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
        OFFSET ${(page - 1) * 18}
        LIMIT 18;
      `;

    if (!lists.length) {
      return res.status(404).json({ message: "No se encontraron listas." });
    }

    const listGames = await sql`SELECT * FROM list_games;`;

    const games = listGames.reduce((acc, { list_id, ...game }) => {
      let list = acc.find((item) => item.list_id === list_id);

      if (!list) {
        list = { list_id, games: [game] };
        acc.push(list);
      } else {
        if (!list.games.some((g) => g.game_id === game.game_id)) {
          list.games.push(game);
        }
      }

      return acc;
    }, []);

    const totalPages =
      await sql`SELECT COUNT(*) FROM lists WHERE visibility = TRUE AND LOWER(title) LIKE ${`%${q}%`};`;

    res
      .status(200)
      .json({ lists, games, totalPages: parseInt(totalPages[0].count) });
  } catch (error) {
    console.error("Error al obtener listas públicas:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getListsById = async (req, res) => {
  const { id } = req.params;
  const { order = "asc" } = req.query;
  try {
    const list = await sql`
            SELECT 
          l.*,
         u.username,
          COALESCE(lg.total_games, 0) AS total_games,
          COALESCE(lk.total_likes, 0) AS total_likes
      FROM 
          lists l
      LEFT JOIN users u ON l.user_id = u.user_id
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
          l.list_id = ${id};
    `;

    if (!list.length) {
      return res.status(404).json({ message: "No se encontró la lista." });
    }

    if (!list[0].visibility && list[0].user_id !== req.user_id) {
      return res.status(404).json({ message: "La lista no es pública." });
    }

    const games = await sql`
            SELECT *
      FROM list_games
      WHERE list_id = ${id}
      ORDER BY game_name ${order === "asc" ? sql`ASC` : sql`DESC`}
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
            l.visibility = FALSE AND u.user_id = ${
              req.user_id
            } AND LOWER(l.title) LIKE ${`%${q}%`}
        ORDER BY ${sql(sort)} ${order === "asc" ? sql`ASC` : sql`DESC`}
        OFFSET ${(page - 1) * 18}
        LIMIT 18;
      `;

    if (!lists.length) {
      return res.status(404).json({ message: "No se encontraron listas." });
    }

    const listGames = await sql`SELECT * FROM list_games;`;

    const games = listGames.reduce((acc, { list_id, ...game }) => {
      let list = acc.find((item) => item.list_id === list_id);

      if (!list) {
        list = { list_id, games: [game] };
        acc.push(list);
      } else {
        if (!list.games.some((g) => g.game_id === game.game_id)) {
          list.games.push(game);
        }
      }

      return acc;
    }, []);

    const totalPages =
      await sql`SELECT COUNT(*) FROM lists WHERE visibility = FALSE AND LOWER(title) LIKE ${`%${q}%`};`;

    res
      .status(200)
      .json({ lists, games, totalPages: parseInt(totalPages[0].count) });
  } catch (error) {
    console.error("Error al obtener listas privadas:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getPopularLists = async (req, res) => {
  try {
    const popularLists = await sql`
      
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
    l.visibility = TRUE
ORDER BY
    lk.total_likes ASC
    LIMIT 3;
    `;

    if (!popularLists.length) {
      return res
        .status(404)
        .json({ message: "No se encontraron listas populares." });
    }

    // Obtengo los IDs de las listas para buscar los juegos
    const listIds = popularLists.map((list) => list.list_id);

    const games = await sql`
        SELECT *
        FROM list_games
        WHERE list_id = ANY(${listIds})
        ORDER BY game_name ASC
        LIMIT 3;
      `;

    res.status(200).json({ lists: popularLists, games });
  } catch (error) {
    console.error("Error al obtener listas populares:", error);
    res.status(500).json({ message: error.message });
  }
};

export const addList = async (req, res) => {
  try {
    const data = req.body;
    data["user_id"] = req.user_id;

    await sql.begin(async (sql) => {
      const insertedList = await ListRepository.create(data);

      if (!insertedList.length) {
        console.error("Error al crear la lista.");
        return res.status(500).json({ message: "Error al crear la lista." });
      }

      const gamesData = data.games.map((game) => ({
        ...game,
        list_id: insertedList[0].list_id,
      }));

      const insertedGames = await ListGamesRepository.createMany(gamesData);

      if (!insertedGames) {
        console.error("Error al agregar juegos a la lista.");
        return res
          .status(500)
          .json({ message: "Error al agregar juegos a la lista." });
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

export const updateList = async (req, res) => {
  try {
    const data = req.body;
    const { list_id } = req.params;

    await sql.begin(async (sql) => {
      // Actualizar los datos de la lista
      await ListRepository.update(data, list_id);

      // Eliminar los juegos que el usuario ha marcado para borrar
      if (data.deletedGameIds.length > 0) {
        await ListGamesRepository.deleteMany(data.deletedGameIds, list_id);
      }

      // Insertar los juegos nuevos o no existentes
      const existingGames = await ListGamesRepository.findById(list_id);

      const existingGameIds = existingGames.map((game) => game.game_id);
      const newGames = data.games.filter(
        (game) => !existingGameIds.includes(game.game_id)
      );

      if (newGames.length > 0) {
        const newGamesData = newGames.map((game) => ({
          ...game,
          list_id,
        }));
        await ListGamesRepository.createMany(newGamesData);
      }

      res.status(200).json({ message: "Lista actualizada correctamente." });
    });
  } catch (error) {
    console.error("Error al actualizar la lista:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteList = async (req, res) => {
  const { list_id } = req.params;

  try {
    const deletedResult = await ListRepository.delete(list_id);

    if (!deletedResult.length) {
      return res.status(404).json({ message: "La lista no existe." });
    }

    res.status(200).json({ message: "Lista eliminada correctamente." });
  } catch (error) {
    console.error("Error al eliminar la lista:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getListLikes = async (req, res) => {
  const { list_id } = req.params;

  try {
    const likes = await sql`
      SELECT * FROM likes WHERE user_id = ${req.user_id} AND likeable_id = ${list_id} AND likeable_type = 'list'
    `;

    if (!likes.length) {
      return res.status(404).json({ message: "No se encontraron me gusta." });
    }

    res.status(200).json(true);
  } catch (error) {
    console.error("Error al obtener me gusta de la lista:", error);
    res.status(500).json({ message: error.message });
  }
};

export const addListLike = async (req, res) => {
  const { list_id } = req.params;

  try {
    const listExists =
      await sql`SELECT 1 FROM lists WHERE list_id = ${list_id}`;
    if (!listExists.length) {
      return res.status(404).json({ message: "La lista no existe." });
    }

    const existingLike = await sql`
      SELECT 1 FROM likes
      WHERE user_id = ${req.user_id} AND likeable_id = ${list_id} AND likeable_type = 'list'
    `;

    if (existingLike.length) {
      await sql` DELETE FROM likes WHERE user_id = ${req.user_id} AND likeable_id = ${list_id} AND likeable_type = 'list'`;

      return res
        .status(204)
        .json({ message: "Me gusta eliminado correctamente." });
    }

    const insertedLike = await sql`
      INSERT INTO likes (user_id, likeable_id, likeable_type)
      VALUES (${req.user_id}, ${list_id}, 'list')
      RETURNING *;
    `;

    res.status(201).json({ message: "Me gusta agregado correctamente." });
  } catch (error) {
    console.error("Error al agregar me gusta:", error);
    res.status(500).json({ message: error.message });
  }
};
