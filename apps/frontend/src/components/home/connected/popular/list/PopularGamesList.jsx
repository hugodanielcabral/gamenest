import propTypes from "prop-types";
import { Link } from "react-router-dom";
import getImageUrl from "../../../../../utils/getImageUrl";

export const PopularGamesList = ({ game }) => {
  return (
    <>
      <li className="*:mx-auto *:text-center">
        <p className="text-white line-clamp-1 text-sm sm:text-base md:text-base lg:text-lg font-bold">
          {game.name}
        </p>
        <Link to={`/games/${game.slug}`}>
          <img
            src={getImageUrl(game.cover.url, "cover_big_2x", "thumb")}
            alt={game.name}
            className="mx-auto border border-white border-opacity-25 hover:border-error transition duration-300 ease-in-out rounded-lg hover:translate-y-2 w-40 h-fit sm:w-48 sm:h-fit md:w-56 md:h-fit lg:w-64 lg:h-fit hover:object-fill"
          />
        </Link>
      </li>
    </>
  );
};

PopularGamesList.propTypes = {
  game: propTypes.object.isRequired,
};
