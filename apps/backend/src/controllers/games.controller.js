import env from "dotenv";

env.config();

/* export const getGames = async (req, res) => {
  try {
    let page = Math.max(Number(req.query.page) || 0, 0);
    let gameName = req.query.gamename || null;

    const headers = {
      "Client-ID": process.env.CLIENT_ID,
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    };

    let body = "";

    if (gameName) {
      body = `fields name, storyline, summary, rating, cover.url, genres.name, platforms.abbreviation, screenshots.url; search "${gameName}";where rating > 1;limit 10; offset ${
        page * 10
      };`;
    } else {
      body = `fields name, storyline, summary, rating, cover.url, genres.name, platforms.abbreviation, screenshots.url; where rating > 1; sort rating desc;count;limit 10; offset ${
        page * 10
      };`;
    }

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
}; */

export const getGames = async (req, res) => {
  try {
    let page = Math.max(Number(req.query.page) || 0, 0);
    let gameName = req.query.gamename || null;

    const headers = {
      "Client-ID": process.env.CLIENT_ID,
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    };

    let body = "";

    if (gameName) {
      body = `fields name, storyline, summary, rating, cover.url, genres.name, platforms.abbreviation, screenshots.url; search "${gameName}";where rating > 1;limit 10; offset ${
        page * 10
      };`;
    } else {
      body = `fields name, storyline, summary, rating, cover.url, genres.name, platforms.abbreviation, screenshots.url; where rating > 1; sort rating desc;limit 10; offset ${
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

    console.log(data);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/* export const getGamesCount = async (req, res) => {
  let gameName = req.query.gamename || null;

  if (!gameName) return;

  try {
    const response = await fetch("https://api.igdb.com/v4/games/count", {
      method: "POST",
      headers: {
        "Client-ID": process.env.CLIENT_ID,
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: `fields name; search "${gameName}";where rating > 1;`,
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.log(error);
  }
}; */
