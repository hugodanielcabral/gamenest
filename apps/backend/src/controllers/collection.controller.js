import sql from "../db.js";
import { getGameInfoFromCollection } from "../utils/getGameInfoFromCollection.js";

export const getCollection = async (req, res) => {
  try {
    const { search, orderBy, sort, page } = req.query;

    //* Because of Postgre.js works, I can't pass the sort value directly to the query, so I need to store it in a variable first.
    const orderByValue = orderBy || "status_name";
    const pageValue = page || 0;

    if (search) {
      const collection = await findCollectionByGameName(
        search,
        req.user_id,
        orderByValue,
        sort
      );

      if (!collection[0])
        return res
          .status(404)
          .json({ message: "No games matches your current search parameters" });

      const collectionWithGameInfo = await getGameInfoFromCollection(
        collection
      );

      return res.status(200).json(collectionWithGameInfo);
    }

    let collection;

    if (sort === "desc") {
      collection = await sql`SELECT * FROM collection ${
        req.user_id ? sql`WHERE user_id = ${req.user_id}` : sql``
      } ORDER BY ${sql(orderByValue)} DESC LIMIT 2 OFFSET ${
        pageValue >= 1 ? (pageValue - 1) * 2 : 0
      } `;
    } else {
      collection = await sql`SELECT * FROM collection ${
        req.user_id ? sql`WHERE user_id = ${req.user_id}` : sql``
      } ORDER BY ${sql(orderByValue)} LIMIT 2 OFFSET ${
        pageValue >= 1 ? (pageValue - 1) * 2 : 0
      } `;
    }

    if (!collection[0])
      return res.status(404).json({ message: "No games found" });

    const collectionWithGameInfo = await getGameInfoFromCollection(collection);

    res.status(200).json(collectionWithGameInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const addGameToCollection = async (req, res) => {
  const {
    game_id,
    game_slug,
    game_name,
    game_cover,
    platform,
    format,
    ownership,
    store,
    status,
    progress_note,
  } = req.body;

  try {
    const collection =
      await sql`INSERT INTO collection (game_id, game_slug, game_name, game_cover, platform_name, format_name, ownership_name, store_name, status_name, progress_note, user_id) VALUES (${game_id}, ${game_slug}, ${game_name}, ${game_cover}, ${platform}, ${format}, ${ownership}, ${store}, ${status}, ${progress_note}, ${req.user_id}) RETURNING *`;

    res.status(201).json(collection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateGameFromCollection = async (req, res) => {
  const { id } = req.params;

  //* I don't need to pass the body parts like "game_id, game_slug, game_name, etc. Because postgres will only update the fields that are passed in the body using the ${sql(req.body)} syntax."

  try {
    const collection = await sql`
      UPDATE collection 
        SET ${sql(req.body)} 
          WHERE collection_id = ${id} 
      RETURNING *`;

    if (!collection[0])
      return res.status(404).json({ message: "Collection not found" });

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
  sortValue
) => {
  try {
    const cleanGameName = gamename.replace(/[^a-zA-Z ]/g, "").toLowerCase();

    let collection;

    if (sortValue === "desc") {
      collection =
        await sql`SELECT * FROM collection WHERE user_id = ${user_id} AND ${sql`regexp_replace(lower(game_name),'[^a-zA-Z ]', '', 'g')`} LIKE ${
          cleanGameName + "%"
        } ORDER BY ${sql(orderByValue)} DESC`;
    } else {
      collection =
        await sql`SELECT * FROM collection WHERE user_id = ${user_id} AND ${sql`regexp_replace(lower(game_name),'[^a-zA-Z ]', '', 'g')`} LIKE ${
          cleanGameName + "%"
        } ORDER BY ${sql(orderByValue)}`;
    }
    return collection;
  } catch (error) {
    console.error(error);
  }
};

export const getTotalCollectionPages = async (req, res) => {
  try {
    const { search } = req.query;
    console.log(search);

    if (search) {
      const cleanGameName = search?.replace(/[^a-zA-Z ]/g, "").toLowerCase();

      const totalGames =
        await sql`SELECT COUNT(*) FROM collection WHERE user_id = ${
          req.user_id
        } AND ${sql`regexp_replace(lower(game_name),'[^a-zA-Z ]', '', 'g')`} LIKE ${
          cleanGameName + "%"
        }`;

      const totalPages = Math.ceil(totalGames[0].count / 2);
      console.log(totalPages, "totalPages");
      res.status(200).json(totalPages);
    }

    const totalGames =
      await sql`SELECT COUNT(*) FROM collection WHERE user_id = ${req.user_id}`;

    const totalPages = Math.ceil(totalGames[0].count / 2);
    res.status(200).json(totalPages);
  } catch (error) {
    console.error(error);
  }
};
