const mapCollections = async (collection, games) => {
  const collectionData = await collection.map((collect) => {
    const gameMatch = games.find((game) => game.id == collect.game_id);

    if (gameMatch) {
      return {
        ...collect,
        name: gameMatch.name,
        cover: gameMatch.cover,
      };
    }
  });

  return collectionData;
};

export default mapCollections;
