const getPlatformAbbreviations = (game) => {
  //* If the total number of platforms is greater than 4, display the first 4 platforms and the remaining platforms as "+n more"
  const totalPlatforms = game.platforms.length;

  if (totalPlatforms > 4) {
    const platforms = game.platforms
      .slice(0, 4)
      .map((platform) => platform.abbreviation);

    const remainingPlatforms = totalPlatforms - 4;

    return [...platforms, `+${remainingPlatforms} more`];
  }

  return game.platforms.map((platform) => platform.abbreviation);
};

export default getPlatformAbbreviations;
