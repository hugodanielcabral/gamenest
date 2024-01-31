import env from "dotenv";

env.config();

export const getGames = async (req, res) => {
  try {
    let page = Number(req.query.page) || 0;

    if (page < 0) page = 0;

    if (page > 0) page = page * 10;

    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": process.env.CLIENT_ID,
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: `fields name, storyline, summary, rating, cover.url, genres.name, platforms.abbreviation, screenshots.url; where rating > 80; sort rating desc; limit 10; offset ${page};`,
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

/* export const getGamesCount = async (req, res) => {
  try {
    const response = await fetch("https://api.igdb.com/v4/games/count", {
      method: "POST",
      headers: {
        "Client-ID": process.env.CLIENT_ID,
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: `fields name;`,
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};
 */
