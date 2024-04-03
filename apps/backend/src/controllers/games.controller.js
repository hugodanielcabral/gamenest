import env from "dotenv";

env.config();

// TODO Improve this controller, it's too big. Maybe split it into smaller functions.
export const getGames = async (req, res) => {
  const { gamename } = req.query || "";
  const { page } = req.query;
  const { platforms } = req.query;
  const { genres } = req.query;

  try {
    const headers = {
      "Client-ID": process.env.CLIENT_ID,
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    };

    let body = "";

    if (gamename) {
      body = `fields *, cover.url, genres.name, platforms.abbreviation, screenshots.url; search "${gamename}"; where rating > 1 ${
        platforms ? `& platforms=(${platforms})` : ""
      }  ${genres ? `& genres=(${genres})` : ""}; limit 10; offset ${
        page ? (page - 1) * 10 : 0
      };`;
    } else {
      body = `fields *, cover.url, genres.name, platforms.abbreviation, screenshots.url; where rating > 1 ${
        platforms ? `& platforms=(${platforms})` : ""
      } ${
        genres ? `& genres=(${genres})` : ""
      }; sort follows desc;limit 10; offset ${page ? (page - 1) * 10 : 0};`;
    }

    const gamesResponse = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers,
      body,
    });
    const gamesData = await gamesResponse.json();

    let countBody = gamename
      ? `search "${gamename}"; where rating > 1;`
      : `where rating > 1;`;

    const countResponse = await fetch("https://api.igdb.com/v4/games/count", {
      method: "POST",
      headers,
      body: countBody,
    });
    const countData = await countResponse.json();

    const data = {
      games: gamesData,
      count: countData,
      currentPage: parseInt(page, 10) || 1,
      totalPages: Math.ceil(countData.count / 10),
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

    const body = `fields *, cover.url, genres.name, platforms.abbreviation, platforms.name, screenshots.url, videos.video_id, artworks.url, websites.*, involved_companies.company.name, involved_companies.developer, game_modes.name, player_perspectives.name, franchises.name, release_dates.*, age_ratings.*, age_ratings.content_descriptions.*; where slug = "${req.params.id}";`;
    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers,
      body,
    });

    const data = await response.json();
    res.json(data[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getGamesFromUser = async (collection) => {
  const collections_id = collection.map((game) => game.game_id).join(",");

  try {
    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": process.env.CLIENT_ID,
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: `fields name, cover.url; where id = (${collections_id});`,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

//* I should use this function to get the token and save it in a .env file
//? I should also use a cron job to update the token every 60 days

/* const getIGDBToken = async () => {
  try {
    const response = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`,
      {
        method: "POST",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data.access_token;
  } catch (error) {
    console.log(error);
  }
}; */
