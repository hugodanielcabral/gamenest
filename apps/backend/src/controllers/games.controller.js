import env from "dotenv";

env.config();

export const getGames = async (req, res) => {
  try {
    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": process.env.CLIENT_ID,
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: `fields name, storyline, summary, rating, cover.url, genres.name, platforms.name, screenshots.url; where id = (1942, 214417, 1877);`,
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};
