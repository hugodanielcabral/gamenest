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
        <p className="text-white line-clamp-1 text-sm md:text-base">
          {game.name}
        </p>
        <p className="text-xs md:text-base text-white">{formattedDate}</p>
        <Link to={`/games/${game.slug}`} className="relative">
          <img
            src={getImageUrl(game?.cover.url, "cover_big")}
            alt={game.name}
            width={264}
            height={352}
            className="mx-auto border border-white border-opacity-50 hover:border-error transition duration-300 ease-in-out rounded-lg hover:translate-y-2 w-20 h-28 sm:w-24 sm:h-36 md:w-28 md:h-36 lg:w-44 lg:h-56"
          />
        </Link>
      </li>
    </>
  );
};

LatestGamesList.propTypes = {
  game: propTypes.object.isRequired,
};
