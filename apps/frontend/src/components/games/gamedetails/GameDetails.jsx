import {
  GameDetailsOverview,
  GameDetailsMedia,
  GameDetailsInfo,
  GameDetailsReleaseDates,
  GameDetailsAgeRating,
} from "./index.js";

export const GameDetails = () => {
  return (
    <div className="grid w-3/4 grid-cols-4 mx-auto mt-3 gap-x-3 gap-y-3">
      <GameDetailsOverview />
      <GameDetailsMedia />
      <GameDetailsInfo />
      <GameDetailsReleaseDates />
      <GameDetailsAgeRating />
    </div>
  );
};
