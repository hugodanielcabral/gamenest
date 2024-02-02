import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./GameCard.css";

export const GameCard = ({ game }) => {
  return (
    <Link key={game.id} to={`/games/gamepage/${game.id}`}>
      <div className="flex items-center justify-between p-3 my-5 border rounded-lg shadow-lg cursor-pointer bg-base-300 border-base-content border-opacity-20">
        <div className="flex flex-1 gap-x-3">
          <img
            src={game.cover.url.replace("t_thumb", "t_1080p")}
            alt={`${game.name} cover`}
            className="object-cover w-20 h-full md:w-36 md:h-full"
          />
          <div className="flex-1">
            <h2 className="font-bold text-balance line-clamp-1 text-base-content">
              {game.name}
            </h2>
            <ul className="flex justify-start gap-4 my-1">
              {game.platforms
                .filter((platform) => platform.abbreviation != null)
                .map((platform) => {
                  return (
                    <li key={platform.id} className="text-error">
                      {platform.abbreviation}
                    </li>
                  );
                })}
            </ul>
            <p className="line-clamp-2 lg:line-clamp-3 text-base-content">
              {game.summary}
            </p>
          </div>
        </div>
        <div
          className={`hidden p-6 text-2xl font-bold rounded-full md:block ${
            game.rating > 49 ? "bg-success" : "bg-error"
          } text-base-300`}
        >
          {Math.round(game.rating)}
        </div>
      </div>
    </Link>
  );
};

GameCard.propTypes = {
  game: PropTypes.object.isRequired,
};
