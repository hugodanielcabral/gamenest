import propTypes from "prop-types";
import { LatestGamesList } from "./list/LatestGamesList.jsx";
import { Loading } from "../../../ui/index.js";
import { useFetch } from "../../../../hooks/useFetch.js";

export const HomeLatestGames = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { data, isLoading } = useFetch(`${BASE_URL}/games/latest/released`);

  let latestGames;

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
    <section className="flex md:flex-row flex-col bg-base-300 justify-around p-4 items-center min-h-[500px]">
      <article>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold  uppercase text-center mt-10 bg-clip-text text-transparent bg-gradient-to-r from-error to-white">
          Latest Games
        </h2>
        <p className="text-base md:text-xl lg:text-2xl text-balance text-center text-white">
          The most recent games released
        </p>
      </article>
      {
        <ul className="flex flex-wrap gap-2 max-w-[800px] justify-center items-center">
          {isLoading && (
            <div className="w-[800px]">
              <Loading />
            </div>
          )}
          {latestGames}
        </ul>
      }
    </section>
  );
};

HomeLatestGames.propTypes = {
  data: propTypes.array.isRequired,
  isLoading: propTypes.bool.isRequired,
};
