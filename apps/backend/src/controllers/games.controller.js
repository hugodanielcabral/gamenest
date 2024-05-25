import env from "dotenv";
import {
  getGamesBySearch,
  getCount,
  getSteamGame,
  getGamesFromUser,
} from "../utils/igdbApiUtils.js";

env.config();

export const getGames = async (req, res) => {
  const { search, page, genres, platforms } = req.query;

  if (search) {
    const { gamesData, countData } = await getGamesBySearch(
      search,
      platforms,
      genres,
      page
    );

    const data = {
      games: gamesData,
      count: countData,
      currentPage: parseInt(page, 10) || 1,
      totalPages: Math.ceil(countData.count / 10),
    };

    return res.json(data);
  }

  const response = await fetch("https://api.igdb.com/v4/games", {
    method: "POST",
    headers: {
      "Client-ID": process.env.CLIENT_ID,
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
    body: `fields *, cover.url, genres.name, platforms.abbreviation, screenshots.url; where rating > 1 & themes != (42) ${
      platforms ? `& platforms=(${platforms})` : ""
    } ${
      genres ? `& genres=(${genres})` : ""
    }; sort rating desc;limit 10; offset ${page ? (page - 1) * 10 : 0};`,
  });

  if (!response.ok) {
    throw new Error("Oops");
  }

  const gamesData = await response.json();
  const countData = await getCount();

  res.json({
    games: gamesData,
    count: countData,
    currentPage: parseInt(page, 10) || 1,
    totalPages: Math.ceil(countData.count / 10),
  });
};

export const getGame = async (req, res) => {
  try {
    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": process.env.CLIENT_ID,
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: `fields *, summary,storyline, cover.url, genres.name, platforms.abbreviation, platforms.name, screenshots.url, videos.video_id, artworks.url, websites.*, involved_companies.company.name, involved_companies.developer, game_modes.name, player_perspectives.name, franchises.name, release_dates.*, age_ratings.*, age_ratings.content_descriptions.*, external_games.uid, external_games.category; where slug = "${req.params.id}";`,
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
      where first_release_date < ${CURRENT_TIMESTAMP} & cover.url != null & themes != (42) & platforms = (6,49,167);sort first_release_date desc;limit 8;
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
  const YEAR_2021 = 1600000000;
  try {
    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": process.env.CLIENT_ID,
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: `fields first_release_date, slug,name, aggregated_rating, cover.url, release_dates.y;
      where aggregated_rating > 85 & rating_count > 60 & first_release_date >= ${YEAR_2021} ;
      limit 20;
      ;
      `,
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
