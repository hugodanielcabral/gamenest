import propTypes from "prop-types";
import { CardBackground } from "../../../ui/cardBackground/CardBackground";
import { GameDetails } from "./gameDetails/GameDetails";
import { CardActions } from "./actions/CardActions";
import { Link } from "react-router-dom";

export const CollectionListCard = ({ game }) => {
  const GAME_PATH = `/collection/${game.game_slug}`;
  return (
    <CardBackground className="group flex gap-2 shadow-black border-l-4 border-l-info hover:border-l-error transition-all duration-300 ease-in-out flex-wrap">
      <Link
        to={GAME_PATH}
        className="flex-grow flex-shrink flex items-center gap-2"
      >
        <GameDetails game={game} />
      </Link>
      <CardActions game={game} />
    </CardBackground>
  );
};

CollectionListCard.propTypes = {
  game: propTypes.object.isRequired,
};
