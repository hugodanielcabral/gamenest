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

export const getGamesBySearch = async (search, platforms, genres, page) => {
  try {
    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": process.env.CLIENT_ID,
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: `fields *, cover.url, genres.name, platforms.abbreviation, screenshots.url; search "${search}"; where rating > 1 ${
        platforms ? `& platforms=(${platforms})` : ""
      }  ${genres ? `& genres=(${genres})` : ""}; limit 10; offset ${
        page ? (page - 1) * 10 : 0
      };`,
    });

    const gamesData = await response.json();
    const countData = await getCount(search);

    return {
      gamesData,
      countData,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getCount = async (search) => {
  try {
    const response = await fetch("https://api.igdb.com/v4/games/count", {
      method: "POST",
      headers: {
        "Client-ID": process.env.CLIENT_ID,
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: `${search ? `search "${search}";` : ""}where rating > 1;`,
    });

    const countData = await response.json();
    return countData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSteamGame = async (steamUID) => {
  if (!steamUID) {
    return null;
  }

  try {
    const response = await fetch(
      `https://store.steampowered.com/api/appdetails?appids=${steamUID}&l=spanish&cc=AR`
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getSteamGame = async (gameData) => {
  if (!gameData[0]?.external_games) {
    return null;
  }

  const steamUID = gameData[0]?.external_games.find(
    (game) => game.category === 1
  )?.uid;

  const steamData = await fetchSteamGame(steamUID);

  if (!steamData) {
    return null;
  }

  return steamData[steamUID].data;
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
