import { gamesGenres } from "../constants/gamedetails/gamesGenres";

export const getGenreIcons = (genreId) => {
  const iconFound = gamesGenres.find((genreIcon) => genreIcon.id === genreId);

  return iconFound ? iconFound : { icon: "icon-[ri--file-unknow-fill]" };
};
