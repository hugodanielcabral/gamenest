import { LatestGamesList } from "./list/LatestGamesList.jsx";
import { Loading } from "../../../ui/index.js";
import { useFetch } from "../../../../hooks/useFetch.ts";

export const HomeLatestGames = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { data, isLoading } = useFetch(`${BASE_URL}/games/latest/released`);

  let latestGames: JSX.Element[] = [];

  if (data) {
    latestGames = data
      .reduce((accumulatedGames, currentGame) => {
        if (!accumulatedGames.find((game) => game.name === currentGame.name)) {
          accumulatedGames.push(currentGame);
        }
        return accumulatedGames;
      }, [])
      .map((game) => <LatestGamesList key={game.id} game={game} />);
  }

  return (
    <section className="flex flex-col justify-around p-4 items-center min-h-[500px] container mx-auto space-y-4">
      <article>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-center mt-10 bg-clip-text text-transparent bg-gradient-to-r from-info to-white">
          Últimos lanzamientos
        </h2>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-balance text-center text-gray-200">
          Los últimos juegos lanzados en las plataformas más populares
        </p>
      </article>
      {
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-5">
          {isLoading && <Loading />}
          {latestGames}
        </ul>
      }
    </section>
  );
};
