import { useFetch } from "../../../../hooks/useFetch";
import { Loading } from "../../../ui/loading/Loading";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt, FaStar, FaFire } from "react-icons/fa";
import { Card, CardContent, CardImage } from "../../../ui/card/Card";
import getImageUrl from "../../../../utils/getImageUrl";
import "./HomePopularGames.css";

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
      <h2 className="text-2xl mt-10 md:text-3xl lg:text-4xl text-gray-300">
        Juegos populares <FaFire className="inline text-red-500" />{" "}
      </h2>

      {!isLoading ? (
        <div className="grid grid-cols-4 md:grid-rows-2 gap-2 self-center p-4">
          {getTopGamesByRating(popularGamesData).map((game: PopularGame, index) => (
            <Card
              key={game.id}
              className="h-80 sm:h-96 focus:outline-none group"
              data-popular-game-id={index}
            >
              <CardImage
                imgSrc={() => getImageUrl(game.cover.url, "cover_big_2x")}
                title={game?.name}
              />
              <CardContent>
                <h2 className="card-title text-pretty text-lg text-info md:text-lg group-first:md:text-xl">
                  {game.name}
                </h2>
                <p className="absolute left-2 top-2 z-10 flex flex-col items-center gap-1 text-sm text-gray-300 md:text-lg">
                  <FaStar className="text-sm text-yellow-400 md:text-lg" />
                  {Math.floor(game.rating)} / 100
                </p>
                <Link to={`/games/${game.slug}`}>
                  <FaExternalLinkAlt className="absolute right-2 top-2 z-10 size-6 text-gray-300 opacity-0 transition-colors duration-300 ease-in-out hover:text-info group-hover:opacity-100" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="mt-10">
          <Loading />
        </div>
      )}
    </section>
  );
};
