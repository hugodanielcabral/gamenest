import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { GameCardRating } from "./rating/GameCardRating";
import { GameDetailCard } from "./detailcard/GameDetailCard";
import "./GameCard.css";

export const GameCard = ({ game }) => {
  return (
    <Link key={game.id} to={`/games/${game.slug}`}>
      <div className="flex items-center justify-between p-3 my-5 transition duration-700 ease-in-out border rounded-lg shadow-lg cursor-pointer bg-base-300 border-base-content border-opacity-20 hover:bg-base-100">
        <GameDetailCard
          cover={game.cover}
          name={game.name}
          platforms={game.platforms}
          summary={game.summary}
        />
        <div className="hidden md:flex-col md:flex">
          <GameCardRating rating={game.rating} />
        </div>
      </div>
    </Link>
  );
};

GameCard.propTypes = {
  game: PropTypes.object.isRequired,
};
