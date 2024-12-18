import { Link } from "react-router-dom";
import { Icon } from "../../../../ui/icon/Icon.tsx";
import { DateTime } from "luxon";
import { PlatformsList } from "../../../../platformsList/PlatformsList.tsx";
import type { IGDBGamesProps } from "../../../../../types/igdbGames.ts";
import getImageUrl from "../../../../../utils/getImageUrl";
import clsx from "clsx";

interface GameProps {
  game: IGDBGamesProps;
}

const GAME_CATEGORY_ENUMS = {
  0: "Edición",
  1: "DLC",
  2: "Expansión",
  3: "Bundle",
  4: "Exp. Ind",
  5: "Mod",
  6: "Episodio",
  7: "Temporada",
  8: "Remake",
  9: "Remaster",
  10: "Port",
  11: "Fork",
  12: "Pack",
  14: "Actualización",
};

export const Card = ({ game }: GameProps) => {
  const coverImageUrl = getImageUrl(game?.cover?.url, "cover_big_2x");
  return (
    <Link
      className="group relative flex h-32 gap-4 overflow-hidden rounded-lg border border-gray-700 bg-base-100 p-4 transition-all duration-300 ease-in-out hover:border-gray-600 hover:bg-base-200 sm:h-36 md:h-40 lg:h-44"
      to={`/games/${game?.slug}`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 blur-md transition-opacity duration-300 group-hover:opacity-30"
        style={{ backgroundImage: `url(${coverImageUrl})` }}
      />

      <div className="relative z-10 flex w-full gap-4">
        <img
          src={coverImageUrl}
          alt={game?.name}
          className="w-16 rounded-lg object-cover sm:w-20 md:w-24 lg:w-28"
        />
        <div className="flex-grow">
          <h2 className="line-clamp-1 text-pretty text-xs text-white sm:text-sm md:text-base">
            {game?.name}{" "}
            <span className="text-gray-300">
              {game?.first_release_date && (
                <span>
                  (
                  {DateTime.fromMillis(
                    game?.first_release_date * 1000,
                  ).toFormat("yyyy")}
                  )
                </span>
              )}
            </span>
          </h2>
          <PlatformsList platforms={game?.platforms} maxVisible={6} />

          {game?.parent_game && !game?.version_parent && (
            <Link
              to={`/games/${game.parent_game.slug}`}
              className="btn-link line-clamp-2 w-fit text-pretty p-0 text-xs text-gray-300 hover:z-50 hover:text-white hover:underline sm:text-sm"
            >
              {GAME_CATEGORY_ENUMS[game?.category] + " de "}
              <span className="font-nunito font-semibold text-white">
                {game?.parent_game.name}
              </span>
            </Link>
          )}

          {game?.version_parent && (
            <Link
              to={`/games/${game?.version_parent.slug}`}
              className="btn-link z-50 line-clamp-2 text-pretty p-0 text-xs text-gray-300 hover:text-white hover:underline sm:text-sm"
            >
              {GAME_CATEGORY_ENUMS[game?.category] + " de "}
              <span className="font-semibold text-white">
                {game?.version_parent.name}
              </span>
            </Link>
          )}
        </div>

        <div className="flex flex-col items-end">
          <Icon
            name="icon-[material-symbols--star]"
            className={clsx("size-4 sm:size-5 md:size-6", {
              "text-red-500": game?.rating < 40,
              "text-orange-800": game?.rating >= 40 && game?.rating < 60,
              "text-green-500": game?.rating >= 60 && game?.rating < 80,
              "text-yellow-500": game?.rating >= 80 && game?.rating < 90,
              "text-teal-400": game?.rating >= 90,
            })}
          />
          <span className="mr-0 text-xs text-white sm:text-sm md:mr-1 md:text-base">
            {Math.floor(game?.rating)}
          </span>
        </div>
      </div>
    </Link>
  );
};
