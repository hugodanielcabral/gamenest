import propTypes from "prop-types";
import {
  GameDetailsMedia,
  GameDetailsInfo,
  GameDetailsReleaseDates,
} from "../index.js";

export const GameDetailsOverview = ({ game }) => {
  return (
    <div className="grid grid-cols-4 gap-3 mt-2">
      <GameDetailsMedia game={game} />
      <GameDetailsInfo game={game} />
      <GameDetailsReleaseDates game={game} />
    </div>
  );
};

GameDetailsOverview.propTypes = {
  game: propTypes.object.isRequired,
};
