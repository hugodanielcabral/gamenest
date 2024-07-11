import sql from "../db.js";
import { getGameInfoFromCollection } from "../utils/getGameInfoFromCollection.js";

//TODO 1: Además de refactorizar getCollection, tendria que en lugar de enviar solamente la data de la collection, tambien deberia enviar un totalPages, la funcion getTotalCollectionPages deberia recibir un parametro para buscar acorde a la query que se le pase, y deberia devolver el total de paginas que se necesitan para mostrar la data de la query que se le pase. De esta forma no tendria que estar creando ifs para saber si estoy buscando por nombre de juego o por status, sino que simplemente le paso la query y me devuelve el total de paginas que necesito para mostrar la data de esa query.

export const getCollection = async (req, res) => {
  try {
    const { search, orderBy, sort, page, status, ownership } = req.query;

    //* Because of Postgre.js works, I can't pass the sort value directly to the query, so I need to store it in a variable first.
    const orderByValue = orderBy || "status_name";
    const pageValue = page || 0;
    const statusValue = status?.split(",") || [];
    const ownershipValue = ownership?.split(",") || [];

    if (search) {
      const collection = await findCollectionByGameName(
        search,
        req.user_id,
        orderByValue,
        sort,
        statusValue,
        ownershipValue
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
      } 

      ${ownership ? sql`AND ownership_name IN ${sql(ownershipValue)}` : sql``}

      ${status ? sql`AND status_name IN ${sql(statusValue)}` : sql``}
      ORDER BY ${sql(orderByValue)} DESC LIMIT 10 OFFSET ${
        pageValue >= 1 ? (pageValue - 1) * 10 : 0
      } `;
    } else {
      collection = await sql`SELECT * FROM collection ${
        req.user_id ? sql`WHERE user_id = ${req.user_id}` : sql``
      } 

      ${ownership ? sql`AND ownership_name IN ${sql(ownershipValue)}` : sql``}
      
      ${
        status ? sql`AND status_name IN ${sql(statusValue)}` : sql``
      } ORDER BY ${sql(orderByValue)} LIMIT 10 OFFSET ${
        pageValue >= 1 ? (pageValue - 1) * 10 : 0
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

    res.status(200).json(collectionWithGameInfo[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const addGameToCollection = async (req, res) => {
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
    progress_note,
    total_played,
    start_date,
    finish_date,
    amount_paid,
  } = req.body;

  total_played = total_played === "" ? null : total_played;
  amount_paid = amount_paid === "" ? null : amount_paid;
  start_date = start_date === "" ? null : start_date;
  finish_date = finish_date === "" ? null : finish_date;

  try {
    const collection =
      await sql`INSERT INTO collection (game_id, game_slug, game_name, game_cover, platform_name, format_name, ownership_name, store_name, status_name, progress_note, total_played, start_date, finish_date, amount_paid, user_id) VALUES (${game_id}, ${game_slug}, ${game_name}, ${game_cover}, ${platform_name}, ${format_name}, ${ownership_name}, ${store_name}, ${status_name}, ${progress_note}, ${total_played}, ${start_date}, ${finish_date}, ${amount_paid}, ${req.user_id}) RETURNING *`;

    res.status(201).json(collection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateGameFromCollection = async (req, res) => {
  const { gameSlug } = req.params;

  //* I don't need to pass the body parts like "game_id, game_slug, game_name, etc. Because postgres will only update the fields that are passed in the body using the ${sql(req.body)} syntax."

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

      const totalPages = Math.ceil(totalGames[0].count / 10);
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

      const totalPages = Math.ceil(totalGames[0].count / 10);
      res.status(200).json(totalPages);
    }

    const totalGames =
      await sql`SELECT COUNT(*) FROM collection WHERE user_id = ${req.user_id}`;

    const totalPages = Math.ceil(totalGames[0].count / 10);
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
