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
    <Link to={`/games/${game.slug}`} className="flex">
      <CardBackground className="group relative flex max-h-[200px] w-full gap-2 bg-opacity-50 shadow-none transition-all duration-300 ease-in-out hover:border-l-blue-400">
        <img
          src={getImageUrl(coverImage, "cover_big")}
          loading="lazy"
          alt={`${game?.name} cover`}
          className="w-20 flex-grow-0 self-center border border-info shadow-md shadow-black transition-all duration-300 ease-in-out group-hover:border-error sm:w-24 md:h-36 md:w-28"
        />
        <div className="flex-grow basis-[600px] space-y-1">
          <h2 className="text-sm font-bold text-white sm:text-base md:text-lg">
            {game?.name || <NoData message="Nombre no disponible" />}
          </h2>
          <ul className="line my-2 flex flex-wrap gap-x-2 *:bg-error *:p-1 *:text-xs *:font-semibold *:text-white *:md:text-sm *:lg:text-base">
            {game?.platforms ? (
              getPlatformAbbreviations(game).map((platform, i) => (
                <Badge key={platform + i}>{platform}</Badge>
              ))
            ) : (
              <NoData message="Plataformas no disponibles" />
            )}
          </ul>
          <p className="line-clamp-2 hidden text-pretty text-white sm:line-clamp-3 sm:text-sm md:text-base">
            {game?.summary || <NoData message="Descripción no disponible" />}
          </p>
        </div>
        <div className="hidden flex-col items-center justify-center gap-y-3 text-success md:flex">
          <div
            className={clsx(
              {
                "text-green-500": ratingPercentage >= 90,
                "text-blue-400":
                  ratingPercentage >= 70 && ratingPercentage < 90,
                "text-yellow-500":
                  ratingPercentage >= 30 && ratingPercentage < 70,
                "text-red-500": ratingPercentage < 30,
              },
              "radial-progress flex items-center self-center bg-base-100",
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
                "text-green-500": ratingPercentage >= 90,
                "text-blue-400":
                  ratingPercentage >= 70 && ratingPercentage < 90,
                "text-yellow-500":
                  ratingPercentage >= 30 && ratingPercentage < 70,
                "text-red-500": ratingPercentage < 30,
              },
              "text-sm font-semibold",
            )}
          >
            {ratingLabel(ratingPercentage)}
          </h3>
        </div>

        <div
          className={clsx(
            {
              "text-green-500": ratingPercentage >= 90,
              "text-blue-400": ratingPercentage >= 70 && ratingPercentage < 90,
              "text-yellow-500":
                ratingPercentage >= 30 && ratingPercentage < 70,
              "text-red-500": ratingPercentage < 30,
            },
            "absolute bottom-0 right-1 text-sm sm:hidden",
          )}
        >
          Rating: {ratingPercentage}%
        </div>
      </CardBackground>
    </Link>
  );
};

GamesFinderCard.propTypes = {
  game: propTypes.object.isRequired,
};
