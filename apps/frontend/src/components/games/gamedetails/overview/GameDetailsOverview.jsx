import propTypes from "prop-types";
import {
  GameDetailsMedia,
  GameDetailsInfo,
  GameDetailsReleaseDates,
  GameDetailsAgeRating,
} from "../index.js";

export const GameDetailsOverview = ({ game }) => {
  return (
    <div className="grid grid-cols-4">
      <GameDetailsMedia game={game} />
      <GameDetailsInfo game={game} />
      <GameDetailsReleaseDates game={game} />
      <GameDetailsAgeRating game={game} />
    </div>
  );
};

GameDetailsOverview.propTypes = {
  game: propTypes.object.isRequired,
};
