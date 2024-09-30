import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "../../../../ui/badge/Badge.tsx";
import { Icon } from "../../../../ui/icon/Icon.tsx";
import getImageUrl from "../../../../../utils/getImageUrl";
import clsx from "clsx";
import { DateTime } from "luxon";
import { Button } from "../../../../ui/button/Button.tsx";

interface GameProps {
  game: {
    id: string;
    name: string;
    cover: { id: string; url: string };
    platforms: { id: string; abbreviation: string; name: string }[];
    slug: string;
    rating: number;
    parent_game?: { id: string; name: string; slug: string };
    first_release_date: number;
    version_parent?: { id: string; name: string; slug: string };
  };
}

const CardList = ({ children }: { children: React.ReactNode }) => {
  return <li className="text-white">{children}</li>;
};

export const Card = ({ game }: GameProps) => {
  const coverImageUrl = getImageUrl(game?.cover?.url, "cover_big_2x");
  const navigate = useNavigate();

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
          <ul className="mb-1 line-clamp-1 flex flex-wrap gap-1 md:mb-4 md:gap-2">
            {game?.platforms?.slice(0, 4).map((platform) => (
              <CardList key={platform.id}>
                <Badge className="text-xs sm:text-sm">
                  {platform.abbreviation}
                </Badge>
              </CardList>
            ))}
            {game?.platforms?.length > 4 && (
              <span className="text-gray-300">...</span>
            )}
          </ul>

          {game?.parent_game && !game?.version_parent && (
            <Button
              onClick={() => navigate(`/games/${game.parent_game.slug}`)}
              className="btn-link line-clamp-2 text-pretty p-0 text-xs text-gray-300 hover:text-white hover:underline sm:text-sm"
            >
              DLC de{" "}
              <span className="font-nunito font-semibold text-white">
                {game?.parent_game.name}
              </span>
            </Button>
          )}

          {game?.version_parent && (
            <Button
              onClick={() => navigate(`/games/${game?.version_parent.slug}`)}
              className="btn-link line-clamp-2 text-pretty p-0 text-xs text-gray-300 hover:text-white hover:underline sm:text-sm"
            >
              Actualización de{" "}
              <span className="font-semibold text-white">
                {game?.version_parent.name}
              </span>
            </Button>
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
