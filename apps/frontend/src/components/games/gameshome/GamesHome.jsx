import { useFetchGames } from "../../../hooks/useFetchGames.js";
import { GameCard } from "../gameshome/card/GameCard.jsx";
import { GamesPagination } from "./pagination/GamesPagination.jsx";
import { GamesSearch } from "./search/GamesSearch.jsx";
import { Loading } from "../../ui/loading/Loading.jsx";
import { NotFound } from "../../notfound/NotFound.jsx";

export const GamesHome = () => {
  const { gamesData, isLoading, currentPage, totalPages } = useFetchGames();

  return (
    <>
      <GamesSearch />
      {isLoading ? (
        <div className="flex justify-center my-60">
          <Loading />
        </div>
      ) : !gamesData.length ? (
        <div className="flex justify-center">
          <NotFound
            message="No games found"
            className="p-5 text-2xl font-bold text-center rounded-lg text-error"
          />
        </div>
      ) : (
        gamesData.map((game) => <GameCard key={game.id} game={game} />)
      )}
      <GamesPagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
};
