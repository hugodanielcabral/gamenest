import { DateTime } from "luxon";
import { useDataFetch } from "../../../hooks/useDataFetch";
import { Loading } from "../../ui/loading/Loading.tsx";
import { Card, CardBody, CardImage, CardTitle } from "./card/Card.tsx";
import { Icon } from "../../ui/icon/Icon.tsx";
import { IGDBGamesProps } from "../../../types/igdbGames.ts";
import { PlatformsList } from "../../platformsList/PlatformsList.tsx";
import clsx from "clsx";


export const HomePopular = () => {
  const { fetchData, isLoading } =
    useDataFetch<IGDBGamesProps[]>(`popular/games`);

  if (isLoading) {
    return (
      <Loading
        className="flex items-start justify-center"
        color="info"
        type="dots"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
      <h2 className="col-span-full font-nunito text-xl text-white md:text-2xl lg:text-3xl">
        Populares ahora mismo
        <Icon name="icon-[noto-v1--fire]" />
      </h2>
      {fetchData && fetchData.length > 0 ? (
        fetchData.map((game) => (
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
          <p className="text-pretty font-nunito text-sm italic text-gray-300 sm:text-lg md:text-xl lg:text-2xl">
            No se encontró ningún juego popular en este momento. Inténtalo más
            tarde.
          </p>
        </div>
      )}
    </div>
  );
};
