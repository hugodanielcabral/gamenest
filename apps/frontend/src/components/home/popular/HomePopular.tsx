import { DateTime } from "luxon";
import { useDataFetch } from "../../../hooks/useDataFetch";
import { Loading } from "../../ui/loading/Loading.tsx";
import { Card, CardBody, CardImage, CardTitle } from "./card/Card.tsx";
import { Badge } from "../../ui/badge/Badge.tsx";
import { Icon } from "../../ui/icon/Icon.tsx";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface Platform {
  id: number;
  abbreviation: string;
  name: string;
}

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
    platforms: Platform[];
    first_release_date: number;
  }[];
}

const HomePopularPlatforms = ({ platforms }: { platforms: Platform[] }) => {
  const [visibilePlatforms, setVisiblePlatforms] = useState<number>(3);

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia("(min-width:720px)");

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setVisiblePlatforms(8);
      } else {
        setVisiblePlatforms(3);
      }
    };

    if (desktopMediaQuery.matches) {
      setVisiblePlatforms(8);
    } else {
      setVisiblePlatforms(3);
    }

    desktopMediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      desktopMediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  const extraPlatforms = platforms.slice(visibilePlatforms);

  return (
    <ul className="mb-1 line-clamp-1 flex flex-wrap items-center gap-1 md:mb-4 md:gap-2">
      {platforms?.slice(0, visibilePlatforms).map(({ id, abbreviation }) => (
        <li key={id}>
          <Badge className="text-xs sm:text-sm">{abbreviation}</Badge>
        </li>
      ))}

      {extraPlatforms.length > 0 && (
        <span className="text-sm text-gray-300">
          ...{extraPlatforms.length} más
        </span>
      )}
    </ul>
  );
};

export const HomePopular = () => {
  const { fetchData, isLoading } =
    useDataFetch<HomePopularProps["fetchData"]>(`popular/games`);

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
                <HomePopularPlatforms platforms={game?.platforms} />
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
