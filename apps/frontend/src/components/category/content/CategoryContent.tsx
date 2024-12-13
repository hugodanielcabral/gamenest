import {
  Card,
  CardBody,
  CardImage,
  CardTitle,
} from "../../home/popular/card/Card.tsx";
import { DateTime } from "luxon";
import { Icon } from "../../ui/icon/Icon.tsx";
import { PlatformsList } from "../../platformsList/PlatformsList.tsx";
import { IGDBGamesProps } from "../../../types/igdbGames.ts";
import clsx from "clsx";

interface CategoryContentProps {
  games: IGDBGamesProps[];
}

export const CategoryContent = ({ games }: CategoryContentProps) => {
  return (
    <div className="grid grid-cols-1 gap-2 p-4 lg:grid-cols-2">
      {games && games.length > 0 ? (
        games.map((game) => (
          <Card
            key={game.id}
            backgroundImage={game?.cover?.url}
            linkTo={`/games/${game?.slug}`}
          >
            <CardBody>
              <CardImage
                url={game?.cover?.url}
                alt={`Cover de ${game?.name}`}
              />
              <div className="flex-grow">
                <CardTitle>
                  {game?.name}{" "}
                  {game?.first_release_date && (
                    <span className="text-gray-300">
                      (
                      {DateTime.fromMillis(
                        game?.first_release_date * 1000,
                      ).toFormat("yyyy")}
                      )
                    </span>
                  )}
                </CardTitle>
                <PlatformsList platforms={game?.platforms} />
              </div>

              {game?.rating && (
                <div className="flex flex-col items-center">
                  <Icon
                    name="icon-[material-symbols--star]"
                    className={clsx("size-4 sm:size-5 md:size-6", {
                      "text-red-500": game?.rating < 40,
                      "text-orange-800":
                        game?.rating >= 40 && game?.rating < 60,
                      "text-green-500": game?.rating >= 60 && game?.rating < 80,
                      "text-yellow-500":
                        game?.rating >= 80 && game?.rating < 90,
                      "text-teal-400": game?.rating >= 90,
                    })}
                  />
                  <span className="mr-0 text-xs text-white sm:text-sm md:mr-1 md:text-base">
                    {Math.floor(game?.rating)} / 100
                  </span>
                </div>
              )}
            </CardBody>
          </Card>
        ))
      ) : (
        <div className="col-span-full justify-center">
          <p className="mt-10 text-pretty text-center font-nunito text-lg italic text-gray-300 sm:text-2xl md:text-3xl lg:text-4xl">
            No se encontró ningún juego.
          </p>
        </div>
      )}
    </div>
  );
};
