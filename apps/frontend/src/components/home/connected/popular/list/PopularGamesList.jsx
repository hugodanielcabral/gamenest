import propTypes from "prop-types";
import { Link } from "react-router-dom";
import getImageUrl from "../../../../../utils/getImageUrl";

export const PopularGamesList = ({ game }) => {
  return (
    <>
      <li className="basis-[280px] *:mx-auto *:text-center">
        <p className="text-white line-clamp-1 text-base md:text-xl font-bold">
          {game.name}
        </p>
        <Link to={`/games/${game.slug}`}>
          <img
            src={getImageUrl(game.cover.url, "cover_big")}
            alt={game.name}
            className="mx-auto border-2 border-info hover:border-error transition duration-300 ease-in-out rounded-lg object-cover"
          />
        </Link>
      </li>
    </>
  );
};

PopularGamesList.propTypes = {
  game: propTypes.object.isRequired,
};
