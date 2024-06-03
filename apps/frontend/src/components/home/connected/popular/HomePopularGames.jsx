import { useFetch } from "../../../../hooks/useFetch.ts";
import { Loading } from "../../../ui";
import { PopularGamesList } from "./list/PopularGamesList";

export const HomePopularGames = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const { data, isLoading } = useFetch(`${BASE_URL}/popular/games`);

  let popularGames;

  if (data) {
    popularGames = data.map((game) => (
      <PopularGamesList key={game.id} game={game} />
    ));
  }

  return (
    <section className="flex bg-base-100 flex-col justify-around items-center min-h-[330px] gap-y-5 mb-10">
      <article>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-center mt-10 bg-clip-text text-transparent bg-gradient-to-r from-info to-white">
          Juegos populares
        </h2>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-balance text-center text-gray-300">
          Los juegos más populares en la actualidad
        </p>
      </article>
      <ul className="gap-x-3 gap-y-5 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 p-4">
        {isLoading && <Loading />}
        {popularGames}
      </ul>
    </section>
  );
};
