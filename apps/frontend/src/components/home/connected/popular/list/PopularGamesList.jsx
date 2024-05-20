import propTypes from "prop-types";
import { Link } from "react-router-dom";
import getImageUrl from "../../../../../utils/getImageUrl";

export const PopularGamesList = ({ game }) => {
  return (
    <>
      <li className="*:mx-auto *:text-center">
        <p className="text-white line-clamp-1 text-sm sm:text-lg md:text-xl lg:text-2xl font-bold">
          {game.name}
        </p>
        <Link to={`/games/${game.slug}`}>
          <img
            src={getImageUrl(game.cover.url, "cover_big_2x", "thumb")}
            alt={game.name}
            className="mx-auto border border-info hover:border-error transition duration-300 ease-in-out rounded-lg object-cover hover:scale-95 w-full"
          />
        </Link>
      </li>
    </>
  );
};

PopularGamesList.propTypes = {
  game: propTypes.object.isRequired,
};
