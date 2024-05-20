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
      <li key={game.id} className="basis-[160px] *:mx-auto *:text-center mb-4">
        <Link to={`/games/${game.slug}`} className="relative">
          <img
            src={getImageUrl(game?.cover.url, "cover_big")}
            alt={game.name}
            width={264}
            height={352}
            className="mx-auto border border-info border-opacity-50 hover:border-error transition duration-300 ease-in-out md:h-72 h-52 md:w-full w-48"
          />
          <p className="text-white line-clamp-1 text-sm md:text-base">
            {game.name}
          </p>
        </Link>
        <p className="text-xs md:text-base text-gray-300">{formattedDate}</p>
      </li>
    </>
  );
};

LatestGamesList.propTypes = {
  game: propTypes.object.isRequired,
};
