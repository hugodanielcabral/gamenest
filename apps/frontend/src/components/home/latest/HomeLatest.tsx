import { DateTime } from "luxon";
import { useDataFetch } from "../../../hooks/useDataFetch";
import { Card, CardContent, CardImage } from "../../ui/card/Card";
import { Loading } from "../../ui/loading/Loading.tsx";
import getImageUrl from "../../../utils/getImageUrl";
import { Carousel, CarouselItem } from "../../ui/carousel/Carousel.tsx";

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
    <div className="w-full">
      <h2 className="col-span-full font-nunito text-xl text-white md:text-2xl lg:text-3xl mb-2">
        Últimos lanzamientos
      </h2>
      <Carousel>
        {fetchData.map((game) => (
          <CarouselItem key={game.id}>
            <Card
              className="w-40 sm:w-44 md:w-52 lg:w-64"
              linkTo={`/games/${game.slug}`}
            >
              <CardImage
                imgSrc={() => getImageUrl(game.cover.url, "cover_big_2x")}
                title={game.name}
                className="h-48 sm:h-60 md:h-72 lg:h-80 xl:h-96"
              />
              <CardContent>
                <h3 className="line-clamp-1 text-pretty text-xs font-semibold sm:text-sm md:text-base">
                  {game.name}
                </h3>
                <p className="text-base-content-secondary text-xs md:text-sm">
                  {DateTime.fromSeconds(game.first_release_date).toFormat("DD")}
                </p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  );
};
