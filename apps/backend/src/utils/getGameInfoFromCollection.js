const combineGameCollectionWithApiData = (gameCollection, gameDataFromApi) => {
  return gameCollection.map((game) => {
    const matchingGameData = gameDataFromApi.find(
      (gameData) => gameData.id == game.game_id
    );
    return { ...game, ...matchingGameData };
  });
};

export const getGameInfoFromCollection = async (gameCollection = []) => {
  const gameIds = gameCollection.map((game) => game.game_id).join(",");

  try {
    const apiResponse = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": process.env.CLIENT_ID,
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: `fields name, cover.url; where id = (${gameIds});`,
    });

    const gameDataFromApi = await apiResponse.json();

    return combineGameCollectionWithApiData(gameCollection, gameDataFromApi);
  } catch (error) {
    console.error("Error fetching game data:", error);
  }
};
