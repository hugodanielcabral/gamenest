import env from "dotenv";
import {
  getGameCount,
  getSteamGame,
  getGamesFromUser,
} from "../utils/igdbApiUtils.js";
import sql from "../db.js";

env.config();

export const getGames = async (req, res) => {
  let {
    q = "",
    page = 1,
    sort = "hypes",
    order = "desc",
    platforms = "",
  } = req.query;

  const response = await fetch("https://api.igdb.com/v4/games", {
    method: "POST",
    headers: {
      "Client-ID": process.env.CLIENT_ID,
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
    body: `fields name, first_release_date, rating, slug, cover.url, genres.name, platforms.abbreviation, platforms.name,release_dates.platform.name, release_dates.game.name, release_dates.date,parent_game.name, parent_game.slug, version_parent.name, version_parent.slug; screenshots.url; ${
      q ? `search "${q}";` : ""
    } where ${
      platforms ? `platforms = (${platforms}) &` : ""
    } rating > 1 & themes != (42) & cover.url != null; ${
      sort && !q ? `sort ${sort} ${order};` : ""
    } limit 12; offset ${(page - 1) * 12};`,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch games", response.statusText);
  }

  const gamesData = await response.json();

  res.json(gamesData);
};

export const getGame = async (req, res) => {
  try {
    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": process.env.CLIENT_ID,
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: `fields *, bundles.name, bundles.slug, bundles.cover.url, dlcs.name, dlcs.slug,dlcs.cover.url, similar_games.name, similar_games.name,similar_games.cover.url,similar_games.slug, summary,storyline, cover.url, genres.name, platforms.abbreviation, platforms.name, screenshots.url, videos.video_id, artworks.url, websites.*, involved_companies.company.name, involved_companies.developer, game_modes.name, player_perspectives.name, franchises.name, release_dates.platform.name, release_dates.game.name, release_dates.date, age_ratings.*, age_ratings.content_descriptions.*, external_games.uid, external_games.category,parent_game.name, parent_game.slug, version_parent.name, version_parent.slug; where slug = "${req.params.id}";`,
    });

    const data = await response.json();

    const steamData = await getSteamGame(data);

    data[0].steamData = steamData;

    res.json(data[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCountGames = async (req, res) => {
  try {
    const { q = "" } = req.query;

    const response = await fetch("https://api.igdb.com/v4/games/count", {
      method: "POST",
      headers: {
        "Client-ID": process.env.CLIENT_ID,
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: `${
        q ? `search "${q}";` : ""
      } where rating > 1 & themes != (42) & cover.url != null;`,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch games count");
    }

    const gamesCount = await response.json();

    res.json(gamesCount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getLatestGames = async (req, res) => {
  const CURRENT_TIMESTAMP = Math.floor(Date.now() / 1000);
  try {
    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": process.env.CLIENT_ID,
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: `fields slug, name,cover.url, first_release_date, themes;
      where first_release_date < ${CURRENT_TIMESTAMP} & cover.url != null & themes != (42) & platforms = (6,49,167);sort first_release_date desc;limit 10;
      `,
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUpcomingGames = async (req, res) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const TOMORROW_TIMESTAMP = Math.floor(tomorrow.getTime() / 1000);

  try {
    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": process.env.CLIENT_ID,
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: `fields slug, name, cover.url, first_release_date, themes;
      where first_release_date > ${TOMORROW_TIMESTAMP} & cover.url != null & themes != (42) & platforms = (6,49,167); sort first_release_date asc; limit 10;
      `,
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMostAnticipatedGames = async (req, res) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const TOMORROW_TIMESTAMP = Math.floor(tomorrow.getTime() / 1000);

  try {
    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": process.env.CLIENT_ID,
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: `fields slug, name, hypes, cover.url, first_release_date, themes;
      where first_release_date > ${TOMORROW_TIMESTAMP} & cover.url != null & themes != (42) & platforms = (6,49,167) & hypes != n;sort hypes desc;limit 10;
      `,
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getPopularGames = async (req, res) => {
  try {
    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": process.env.CLIENT_ID,
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: `fields name, cover.url,slug, hypes, rating,release_dates.human; where rating >= 80; sort hypes desc;`,
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSteamGameAchievement = async (req, res) => {
  try {
    const response =
      await sql`SELECT * FROM user_game_achievement WHERE game_slug = ${req.params.id} AND user_id = ${req.user_id}`;

    if (!response[0])
      return res.status(404).json({ error: "Achievement not found" });

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createSteamGameAchievement = async (req, res) => {
  const { gameSlug, achievements } = req.body;

  try {
    const achievementsExist =
      await sql`SELECT * FROM user_game_achievement WHERE game_slug = ${gameSlug} AND user_id = ${req.user_id}`;

    if (achievementsExist[0]) {
      const updateAchievement =
        await sql`UPDATE user_game_achievement SET achievement_name = ${achievements} WHERE game_slug = ${gameSlug} AND user_id = ${req.user_id} RETURNING *`;

      return res.status(200).json(updateAchievement);
    }

    const newAchievement =
      await sql`INSERT INTO user_game_achievement (game_slug, achievement_name, user_id) VALUES (${gameSlug}, ${achievements}, ${req.user_id}) RETURNING *`;

    res.status(200).json(newAchievement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getGamesBySearch = async (req, res) => {
  try {
    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": process.env.CLIENT_ID,
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: `fields name, cover.url, slug; search "${req.body.search}"; limit 50;`,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch games", response.statusText);
    }

    const gamesData = await response.json();
    res.json(gamesData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
