import propTypes from "prop-types";
import getPlatformAbbreviations from "../../../../utils/getPlatformAbbreviations.js";
import ratingLabel from "../../../../utils/ratingLabel.js";
import { CardBackground } from "../../../ui/index.js";
import { clsx } from "clsx";
import { NoData } from "../../../notfound/NoData.jsx";
import { Link } from "react-router-dom";
import getImageUrl from "../../../../utils/getImageUrl.js";
import { Badge } from "../../../ui/index.js";

export const GamesFinderCard = ({ game }) => {
  const coverImage =
    game?.cover?.url ||
    "https://placehold.co/264x352?text=No+Cover+Image+Available";

  const ratingPercentage = Math.floor(game?.rating) || 0;

  return (
    <Link to={`/games/${game.slug}`}>
      <CardBackground className="group flex gap-2 max-h-[200px] shadow-black border-l-4 border-l-info hover:border-l-error transition-all duration-300 ease-in-out">
        <img
          src={getImageUrl(coverImage, "cover_big")}
          loading="lazy"
          alt={`${game?.name} cover`}
          className="flex-grow-0 w-28 border border-info group-hover:border-error transition-all duration-300 ease-in-out"
        />
        <div className="flex-grow basis-[600px] space-y-3">
          <h2 className="text-lg md:text-1xl lg:text-2xl font-bold text-white">
            {game?.name || <NoData message="No name available" />}
          </h2>
          <ul className="flex gap-x-2 flex-wrap *:p-1 *:bg-error *:text-white *:font-semibold my-2 *:md:text-sm *:text-xs *:lg:text-base line">
            {game?.platforms ? (
              getPlatformAbbreviations(game).map((platform, i) => (
                <Badge key={platform + i}>{platform}</Badge>
              ))
            ) : (
              <NoData message="No platforms available" />
            )}
          </ul>
          <p className="text-balance text-white line-clamp-2 md:line-clamp-3">
            {game?.summary || <NoData message="No summary available" />}
          </p>
        </div>
        <div className="md:flex flex-col items-center justify-center gap-y-3 text-success hidden">
          <div
            className={clsx(
              {
                "text-success": ratingPercentage > 70,
                "text-warning": ratingPercentage > 40 && ratingPercentage <= 70,
                "text-error": ratingPercentage <= 40,
              },
              "radial-progress bg-base-100 flex items-center self-center"
            )}
            style={{
              "--value": ratingPercentage,

              "--thickness": "2px",
            }}
            role="progressbar"
          >
            {ratingPercentage}%
          </div>
          <h3
            className={clsx(
              {
                "text-success": ratingPercentage > 70,
                "text-warning": ratingPercentage > 40 && ratingPercentage <= 70,
                "text-error": ratingPercentage <= 40,
              },
              "font-semibold text-sm"
            )}
          >
            {ratingLabel(ratingPercentage)}
          </h3>
        </div>
      </CardBackground>
    </Link>
  );
};

GamesFinderCard.propTypes = {
  game: propTypes.object.isRequired,
};
