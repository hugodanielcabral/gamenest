import { useGames } from "../../../context/GamesContext.jsx";
import { useQuery } from "../../../hooks/useQuery.js";
import { GameCard } from "../gameshome/card/GameCard.jsx";
import { GamesPagination } from "./pagination/GamesPagination.jsx";
import { GamesSearch } from "./search/GamesSearch.jsx";
import { Loading } from "../../ui/loading/Loading.jsx";
import { NotFound } from "../../notfound/NotFound.jsx";
import { useFetchGames } from "../../../hooks/useFetchGames.js";

export const GamesHome = () => {
  const { page, totalPages } = useGames();
  const { params, handlePageChange, handleQueryNameChange, handleResetSearch } =
    useQuery("games");
  const { gamesData, isLoading } = useFetchGames();

  const { count } = totalPages;

  return (
    <div className="games-home">
      <GamesSearch
        handleQueryNameChange={handleQueryNameChange}
        params={params}
        handleResetSearch={handleResetSearch}
      />
      {isLoading ? (
        <div className="flex justify-center my-60">
          <Loading />
        </div>
      ) : count === 0 || !gamesData.length ? (
        <div className="flex justify-center">
          <NotFound
            message="No games found"
            className="p-5 text-2xl font-bold text-center rounded-lg text-error"
          />
        </div>
      ) : (
        gamesData.map((game) => <GameCard key={game.id} game={game} />)
      )}
      <GamesPagination
        page={page}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  );
};
