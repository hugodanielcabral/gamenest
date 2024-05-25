import { esrbRatingsData, pegiRatingsData } from "../constants/index.js";
import { sanitizeHTMLText } from "./clearHTMLfromText";

export const retrieveGameSummary = (steam_short_description, igdb_summary) => {
  if (steam_short_description) {
    return sanitizeHTMLText(steam_short_description);
  }

  if (igdb_summary.length > 0) {
    return igdb_summary;
  }

  return null;
};

export const retrieveGameStoryline = (
  steam_detailed_description,
  igdb_storyline
) => {
  if (steam_detailed_description) {
    return sanitizeHTMLText(steam_detailed_description);
  }

  if (igdb_storyline) {
    return igdb_storyline;
  }

  return null;
};

export const getFormattedRatings = (ageRatings) => {
  if (!ageRatings) {
    return { formattedEsrbRating: null, formattedPegiRating: null };
  }

  let formattedEsrbRating;
  let formattedPegiRating;

  const filteredAgeRatings = ageRatings.filter(
    (rating) =>
      rating.category !== 3 &&
      rating.category !== 4 &&
      rating.category !== 5 &&
      rating.category !== 6 &&
      rating.category !== 7
  );

  const esrbRating = filteredAgeRatings.filter(
    (rating) => rating.category === 1
  );

  const pegiRating = filteredAgeRatings.filter(
    (rating) => rating.category === 2
  );

  if (esrbRating.length > 0) {
    formattedEsrbRating = esrbRatingsData.find(
      (rating) => rating.igdbRating === esrbRating[0].rating
    );
  }

  if (pegiRating.length > 0) {
    formattedPegiRating = pegiRatingsData.find(
      (rating) => rating.igdbRating === pegiRating[0].rating
    );
  }

  return { formattedEsrbRating, formattedPegiRating };
};
