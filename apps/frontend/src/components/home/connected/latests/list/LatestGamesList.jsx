import propTypes from "prop-types";
import getImageUrl from "../../../../../utils/getImageUrl";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";

export const LatestGamesList = ({ game }) => {
  const timestamp = game.first_release_date;
  const date = DateTime.fromSeconds(timestamp);
  const formattedDate = date.toFormat("LL/dd/yyyy");
  return (
    <>
      <li key={game.id} className="basis-[160px] *:mx-auto *:text-center">
        <Link to={`/games/${game.slug}`} className="relative">
          <img
            src={getImageUrl(game?.cover.url, "cover_big")}
            alt={game.name}
            className="w-30 h-32 md:h-40 md:w-36 mx-auto border border-info border-opacity-50 hover:border-error transition duration-300 ease-in-out"
          />
          <p className="text-white line-clamp-1 text-sm md:text-base">
            {game.name}
          </p>
        </Link>
        <p className="font-semibold text-xs md:text-sm">{formattedDate}</p>
      </li>
    </>
  );
};

LatestGamesList.propTypes = {
  game: propTypes.object.isRequired,
};
