import { DateTime } from "luxon";
import { useDataFetch } from "../../../hooks/useDataFetch";
import { Card, CardContent, CardImage } from "../../ui/card/Card";
import getImageUrl from "../../../utils/getImageUrl";
import { Carousel, CarouselItem } from "../../ui/carousel/Carousel.tsx";
import { HomeLatestSkeleton } from "./HomeLatestSkeleton.tsx";

interface HomeLatestProps {
  fetchData: {
    id: number;
    name: string;
    cover: {
      id: number;
      url: string;
    };
    first_release_date: number;
    platforms: {
      id: number;
      abbreviation: string;
      name: string;
    }[];
    slug: string;
  }[];
}

export const HomeLatest = () => {
  const { fetchData, isLoading } = useDataFetch<HomeLatestProps["fetchData"]>(
    `games/latest/released`,
  );

  return (
    <div className="w-full">
      <h2 className="col-span-full mb-2 font-nunito text-xl text-white md:text-2xl lg:text-3xl">
        Lanzamientos de los últimos días
      </h2>

      {isLoading ? (
        <HomeLatestSkeleton />
      ) : (
        <Carousel>
          {fetchData && fetchData.length > 0 ? (
            fetchData.map((game) => (
              <CarouselItem key={game.id}>
                <Card
                  className="w-40 border-2 border-base-100 transition-all duration-300 ease-in-out hover:border-2 hover:border-gray-600 sm:w-44 md:w-52 lg:w-60"
                  linkTo={`/games/${game.slug}`}
                >
                  <CardImage
                    imgSrc={() => getImageUrl(game.cover.url, "cover_big_2x")}
                    title={game.name}
                    className="h-48 sm:h-60 md:h-72 lg:h-80 xl:h-80"
                  />
                  <CardContent>
                    <h3 className="line-clamp-1 text-pretty text-xs font-semibold sm:text-sm md:text-base">
                      {game.name}
                    </h3>
                    <p className="text-base-content-secondary text-xs md:text-sm">
                      {DateTime.fromSeconds(game.first_release_date).toFormat(
                        "DD",
                      )}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))
          ) : (
            <div className="col-span-full justify-center">
              <p className="text-pretty font-nunito text-sm italic text-gray-300 sm:text-lg md:text-xl lg:text-2xl">
                No se encontró ningún juego reciente en este momento. Inténtalo
                más tarde.
              </p>
            </div>
          )}
        </Carousel>
      )}
    </div>
  );
};
