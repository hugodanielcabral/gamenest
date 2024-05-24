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
