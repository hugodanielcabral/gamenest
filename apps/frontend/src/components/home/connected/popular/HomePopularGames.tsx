import { useFetch } from "../../../../hooks/useFetch";
import { Loading } from "../../../ui/loading/Loading";
import { Link } from "react-router-dom";
import { Card, CardImage } from "../../../ui/card/Card";
import getImageUrl from "../../../../utils/getImageUrl";
import "./HomePopularGames.css";
import { FaFire, FaStar } from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface PopularGame {
  id: number;
  name: string;
  slug: string;
  cover: {
    url: string;
  };
  rating: number;
}

export const HomePopularGames = () => {
  const { data: popularGamesData, isLoading } = useFetch(
    `${BASE_URL}/popular/games`,
  );

  const getTopGamesByRating = (popularGames: PopularGame[]) => {
    return popularGames.slice(0, 5).sort((a, b) => {
      if (a.rating > b.rating) {
        return -1;
      }
      if (a.rating < b.rating) {
        return 1;
      }

      return 0;
    });
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <h2 className="mt-10 text-2xl text-gray-300 md:text-3xl lg:text-4xl">
        Juegos populares <FaFire className="inline text-red-500" />{" "}
      </h2>

      {!isLoading ? (
        <div className="grid grid-cols-4 gap-2 self-center p-4 sm:grid-cols-3 md:grid-rows-2 lg:max-w-4xl lg:grid-cols-4 xl:max-w-5xl">
          {getTopGamesByRating(popularGamesData).map(
            (game: PopularGame, index) => (
              <Card
                key={game.id}
                className="h-full w-40 sm:w-44 relative"
                data-popular-game-id={index}
                linkTo={`/games/${game.slug}`}
              >
                <CardImage
                  imgSrc={() => getImageUrl(game.cover.url, "cover_big_2x")}
                  title={game?.name}
                />
                <div className="flex items-center gap-1 text-yellow-400 absolute left-1 top-1 bg-base-100 bg-opacity-75 rounded-full p-1 lg:p-1">
                  <FaStar className="size-2 lg:size-4"/>
                  <span className="text-xs lg:text-sm">{Math.floor(game?.rating)}</span>
                </div>
              </Card>
            ),
          )}
        </div>
      ) : (
        <div className="mt-10">
          <Loading />
        </div>
      )}
    </section>
  );
};
