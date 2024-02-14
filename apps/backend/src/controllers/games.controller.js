import env from "dotenv";

env.config();

export const getGames = async (req, res) => {
  try {
    let page = Math.max(Number(req.query.page) || 0, 0);
    let gameName = req.query.gamename || null;
    let platforms = req.query.platforms
      ? `& platforms=(${req.query.platforms})`
      : "";

    let genres = req.query.genres ? `& genres=(${req.query.genres})` : "";

    const headers = {
      "Client-ID": process.env.CLIENT_ID,
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    };

    let body = "";

    if (gameName) {
      body = `fields *, cover.url, genres.name, platforms.abbreviation, screenshots.url; search "${gameName}";where rating > 1 ${`${platforms}`} ${genres};limit 10; offset ${
        page * 10
      };`;
    } else {
      body = `fields *, cover.url, genres.name, platforms.abbreviation, screenshots.url; where rating > 1 ${`${platforms}`} ${genres}; sort follows desc;limit 10; offset ${
        page * 10
      };`;
    }

    const gamesResponse = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers,
      body,
    });
    const gamesData = await gamesResponse.json();

    let countBody = "";
    if (gameName) {
      countBody = `search "${gameName}";where rating > 1;`;
    } else {
      countBody = `where rating > 1;`;
    }

    const countResponse = await fetch("https://api.igdb.com/v4/games/count", {
      method: "POST",
      headers,
      body: countBody,
    });
    const countData = await countResponse.json();

    const data = {
      games: gamesData,
      count: countData,
    };

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getGame = async (req, res) => {
  try {
    const headers = {
      "Client-ID": process.env.CLIENT_ID,
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    };

    const body = `fields *, cover.url, genres.name, platforms.abbreviation, screenshots.url, videos.video_id, artworks.url, websites.*, involved_companies.company.name, involved_companies.developer, game_modes.name, player_perspectives.name, franchises.name, release_dates.*, age_ratings.*, age_ratings.content_descriptions.*; where slug = "${req.params.id}";`;
    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers,
      body,
    });

    const data = await response.json();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
