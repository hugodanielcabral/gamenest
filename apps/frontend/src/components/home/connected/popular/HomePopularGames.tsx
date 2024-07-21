import { useEffect, useState } from "react";
import { useFetch } from "../../../../hooks/useFetch";
import { Carousel } from "../../../ui/carousel/Carousel";
import { Link } from "react-router-dom";
import { Loading } from "../../../ui/loading/Loading";
import getImageUrl from "../../../../utils/getImageUrl";
const BASE_URL = import.meta.env.VITE_BASE_URL;

interface Game {
  id: number;
  name: string;
  slug: string;
  cover: {
    url: string;
  };
  rating: number;
}

const SMALL_SCREEN = window.innerWidth < 640;
const MEDIUM_SCREEN = window.innerWidth < 768;
const LARGE_SCREEN = window.innerWidth < 1024;
const XL_SCREEN = window.innerWidth < 1280;

export const HomePopularGames = () => {
  const { data, isLoading } = useFetch(`${BASE_URL}/popular/games`);
  const [end, setEnd] = useState(4);

  const handleOnWindowResize = () => {
    if (SMALL_SCREEN) {
      setEnd(2);
      return;
    }

    if (MEDIUM_SCREEN) {
      setEnd(3);
      return;
    }

    if (LARGE_SCREEN) {
      setEnd(5);
      return;
    }

    if (XL_SCREEN) {
      setEnd(5);
      return;
    }
  };

  const handleOnMouseEnter = (e: React.MouseEvent<HTMLImageElement>) => {
    e.currentTarget.nextElementSibling?.nextElementSibling.classList.remove(
      "hidden",
    );
  };

  const handleOnMouseLeave = (e: React.MouseEvent<HTMLImageElement>) => {
    e.currentTarget.nextElementSibling?.nextElementSibling.classList.add(
      "hidden",
    );
  };

  useEffect(() => {
    window.addEventListener("resize", handleOnWindowResize);

    return () => {
      window.removeEventListener("resize", handleOnWindowResize);
    };
  }, []);

  useEffect(() => {
    handleOnWindowResize();
  }, []);

  return (
    <div className="flex flex-col mt-5">
      <h2 className="text-center text-lg uppercase tracking-wider text-white underline decoration-blue-500 decoration-4 underline-offset-4 sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
        Populares
      </h2>
      {!isLoading ? (
        <Carousel
          length={data?.length}
          start={0}
          end={end}
          className="bg-transparent"
        >
          {data?.map((game: Game) => (
            <li key={game.id} className="w-32 sm:w-36 md:w-40 lg:w-48 xl:w-56">
              <Link
                to={`/games/${game.slug}`}
                target="_blank"
                className="hover:bg-opacity-70"
              >
                <img
                  src={getImageUrl(game.cover.url, "cover_big_2x")}
                  alt={game?.name}
                  className="rounded-t-md"
                />
              </Link>
              <div className="relative h-16 space-y-1 rounded-b-md bg-base-100 bg-opacity-90 p-4 sm:h-20 md:h-20 lg:h-24">
                <h3
                  className="line-clamp-1 text-xs text-white sm:text-sm md:text-sm lg:text-lg"
                  onMouseEnter={handleOnMouseEnter}
                  onMouseLeave={handleOnMouseLeave}
                >
                  {game?.name}
                </h3>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg">
                  {game?.rating ? `⭐ ${Math.round(game.rating)}/100` : null}
                </p>
                <p className="absolute -top-14 left-0 z-10 hidden w-32 text-pretty border border-gray-700 bg-base-100 p-2 text-center text-xs text-white sm:w-36 lg:text-base md:w-40 lg:w-48 xl:w-56 lg:-top-12">
                  {game?.name}
                </p>
              </div>
            </li>
          ))}
        </Carousel>
      ) : (
        <div className="mx-auto mt-10">
          <Loading />
        </div>
      )}
    </div>
  );
};
