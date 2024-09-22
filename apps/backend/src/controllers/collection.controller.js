import sql from "../db.js";
import { getGameInfoFromCollection } from "../utils/getGameInfoFromCollection.js";

export const getCollection = async (req, res) => {
  try {
    const { platforms, status, ownership, favorites, q } = req.query;

    //* Because of Postgre.js works, I can't pass the sort value directly to the query, so I need to store it in a variable first.

    const collection = await sql`SELECT * FROM collection WHERE user_id = ${
      req.user_id
    } ${
      platforms ? sql`AND platform_name IN ${sql(platforms.split(","))}` : sql``
    } ${status ? sql`AND status_name IN ${sql(status.split(","))}` : sql``}
    ${
      ownership
        ? sql`AND ownership_name IN ${sql(ownership.split(","))}`
        : sql``
    }
    ${favorites ? sql`AND is_favorite = ${favorites === "true"}` : sql``}
    ${q ? sql`AND game_name ILIKE ${q + "%"}` : sql``}
    LIMIT 12
    `;

    if (!collection[0])
      return res.status(404).json({ message: "No se encontraron juegos." });

    const collectionWithGameInfo = await getGameInfoFromCollection(collection);

    res.status(200).json(collectionWithGameInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getGameFromCollection = async (req, res) => {
  const { gameSlug } = req.params;

  try {
    const collection =
      await sql`SELECT * FROM collection WHERE game_slug = ${gameSlug} AND user_id = ${req.user_id}`;

    if (!collection[0])
      return res
        .status(404)
        .json({ message: "Game not found in your collection" });

    const collectionWithGameInfo = await getGameInfoFromCollection(collection);

    res.status(200).json(collectionWithGameInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const addCollection = async (req, res) => {
  let {
    game_id,
    game_slug,
    game_name,
    game_cover,
    platform_name,
    format_name,
    ownership_name,
    store_name,
    status_name,
    start_date,
    finish_date,
    rating,
    amount_paid,
    hours_played,
    minutes_played,
    difficulty,
    is_favorite,
  } = req.body;

  try {
    const newCollection =
      await sql`INSERT INTO collection (user_id, game_id, game_slug, game_name, game_cover, platform_name, format_name, ownership_name, store_name, status_name, start_date, finish_date, rating, amount_paid, hours_played, minutes_played, difficulty, is_favorite) VALUES (${req.user_id}, ${game_id}, ${game_slug}, ${game_name}, ${game_cover}, ${platform_name}, ${format_name}, ${ownership_name}, ${store_name}, ${status_name}, ${start_date}, ${finish_date}, ${rating}, ${amount_paid}, ${hours_played}, ${minutes_played}, ${difficulty}, ${is_favorite}) RETURNING *`;

    res.status(201).json(newCollection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateCollection = async (req, res) => {
  const { gameSlug } = req.params;

  try {
    const gameExists =
      await sql`SELECT * FROM collection WHERE game_slug = ${gameSlug} AND user_id = ${req.user_id}`;

    if (!gameExists[0])
      return res
        .status(404)
        .json({ message: "Game not found in your collection" });

    if (req.body.start_date === "") req.body.start_date = null;

    if (req.body.finish_date === "") req.body.finish_date = null;

    const collection = await sql`UPDATE collection SET ${sql(
      req.body
    )} WHERE game_slug = ${gameSlug} AND user_id = ${req.user_id} RETURNING *`;

    res.status(200).json(collection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteGameFromCollection = async (req, res) => {
  const { id } = req.params;
  try {
    const collection =
      await sql`DELETE FROM collection WHERE collection_id = ${id} RETURNING *`;

    if (!collection[0])
      return res.status(404).json({ message: "Collection not found" });

    res.status(204).json(collection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const findCollectionByGameName = async (
  gamename,
  user_id,
  orderByValue,
  sortValue,
  statusValue,
  ownershipValue
) => {
  try {
    const cleanGameName = gamename.replace(/[^a-zA-Z ]/g, "").toLowerCase();

    let collection;

    if (sortValue === "desc") {
      collection =
        await sql`SELECT * FROM collection WHERE user_id = ${user_id} AND ${sql`regexp_replace(lower(game_name),'[^a-zA-Z ]', '', 'g')`} LIKE ${
          cleanGameName + "%"
        } 
        
        ${
          ownershipValue.length
            ? sql`AND ownership_name IN ${sql(ownershipValue)}`
            : sql``
        }
        ${
          statusValue.length
            ? sql`AND status_name IN ${sql(statusValue)}`
            : sql``
        } ORDER BY ${sql(orderByValue)} DESC`;
    } else {
      collection =
        await sql`SELECT * FROM collection WHERE user_id = ${user_id} AND ${sql`regexp_replace(lower(game_name),'[^a-zA-Z ]', '', 'g')`} LIKE ${
          cleanGameName + "%"
        }

        ${
          ownershipValue.length
            ? sql`AND ownership_name IN ${sql(ownershipValue)}`
            : sql``
        }
        
        ${
          statusValue.length
            ? sql`AND status_name IN ${sql(statusValue)}`
            : sql``
        } ORDER BY ${sql(orderByValue)}`;
    }
    return collection;
  } catch (error) {
    console.error(error);
  }
};

export const getTotalCollectionPages = async (req, res) => {
  try {
    const { search, status, ownership } = req.query;

    if (search) {
      const cleanGameName = search?.replace(/[^a-zA-Z ]/g, "").toLowerCase();

      const totalGames =
        await sql`SELECT COUNT(*) FROM collection WHERE user_id = ${
          req.user_id
        } AND ${sql`regexp_replace(lower(game_name),'[^a-zA-Z ]', '', 'g')`} LIKE ${
          cleanGameName + "%"
        }`;

      const totalPages = Math.ceil(totalGames[0].count / 20);
      console.log(totalPages, "totalPages");
      res.status(200).json(totalPages);
    }

    if (status || ownership) {
      const statusValue = status?.split(",") || [];
      const ownershipValue = ownership?.split(",") || [];

      const totalGames =
        await sql`SELECT COUNT(*) FROM collection WHERE user_id = ${
          req.user_id
        } AND ownership_name IN ${sql(ownershipValue)} AND status_name IN ${sql(
          statusValue
        )}`;

      const totalPages = Math.ceil(totalGames[0].count / 20);
      res.status(200).json(totalPages);
    }

    const totalGames =
      await sql`SELECT COUNT(*) FROM collection WHERE user_id = ${req.user_id}`;

    const totalPages = Math.ceil(totalGames[0].count / 20);
    res.status(200).json(totalPages);
  } catch (error) {
    console.error(error);
  }
};

export const getCollectionFilters = async (req, res) => {
  try {
    const status = await sql`SELECT DISTINCT status_name FROM collection`;
    const ownership = await sql`SELECT DISTINCT ownership_name FROM collection`;

    res.status(200).json({ status, ownership });
  } catch (error) {
    console.error(error);
  }
};
