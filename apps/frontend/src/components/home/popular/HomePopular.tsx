import { DateTime } from "luxon";
import { useDataFetch } from "../../../hooks/useDataFetch";
import { Loading } from "../../ui/loading/Loading.tsx";
import { Card, CardBody, CardImage, CardTitle } from "./card/Card.tsx";
import { Badge } from "../../ui/badge/Badge.tsx";
import { Icon } from "../../ui/icon/Icon.tsx";
import clsx from "clsx";

interface HomePopularProps {
  fetchData: {
    id: number;
    name: string;
    cover: {
      id: number;
      url: string;
    };
    hypes: number;
    rating: number;
    release_dates: {
      id: number;
      human: string;
    }[];
    slug: string;
    platforms: {
      id: number;
      abbreviation: string;
      name: string;
    }[];
    first_release_date: number;
  }[];
}

export const HomePopular = () => {
  const { fetchData, isLoading } =
    useDataFetch<HomePopularProps["fetchData"]>(`popular/games`);

  if (isLoading) {
    return (
      <Loading
        className="flex min-h-screen items-start justify-center lg:col-span-3"
        color="primary"
        type="ring"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
      <h2 className="col-span-full font-nunito text-xl text-red-500 md:text-2xl lg:text-3xl">
        Populares ahora mismo
        <Icon name="icon-[noto-v1--fire]" />
      </h2>
      {fetchData && fetchData.length > 0 ? (
        fetchData.map((game) => (
          <Card
            key={game.id}
            backgroundImage={game?.cover?.url}
            linkTo={game?.slug}
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
                <ul className="mb-1 line-clamp-1 flex flex-wrap gap-1 md:mb-4 md:gap-2">
                  {game?.platforms?.slice(0, 4).map((platform) => (
                    <li key={platform.id}>
                      <Badge className="text-xs sm:text-sm">
                        {platform?.abbreviation}
                      </Badge>
                    </li>
                  ))}
                  {game?.platforms?.length > 4 && (
                    <span className="text-gray-300">...</span>
                  )}
                </ul>
              </div>

              {game?.rating && (
                <div className="flex flex-col items-end">
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
                    {Math.floor(game?.rating)}
                  </span>
                </div>
              )}
            </CardBody>
          </Card>
        ))
      ) : (
        <div className="col-span-full flex min-h-screen justify-center">
          <p className="mt-10 text-pretty text-center font-nunito text-lg text-white sm:text-2xl md:text-3xl lg:text-4xl">
            No se encontró ningún juego "popular".
          </p>
        </div>
      )}
    </div>
  );
};
