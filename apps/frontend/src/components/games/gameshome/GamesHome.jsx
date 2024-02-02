import { useGames } from "../../../context/GamesContext.jsx";
import { useNavigate } from "react-router-dom";
import { GameCard } from "../gameshome/card/GameCard.jsx";
import { Loading } from "../../ui/loading/Loading.jsx";
import { GamesSearch } from "./search/GamesSearch.jsx";
import { GamesPagination } from "./pagination/GamesPagination.jsx";
import { NotFound } from "../../notfound/NotFound.jsx";
export const GamesHome = () => {
  const { games, isLoading, page, totalPages } = useGames();

  const { count } = totalPages;

  let params = new URL(document.location);
  const navigate = useNavigate();

  const handlePageChange = (newPage) => {
    params.searchParams.set("page", newPage);
    navigate(`/games${params.search}`);
  };

  const handleGameNameChange = (gameName) => {
    params.searchParams.set("gamename", gameName);
    if (params.searchParams.get("page") !== "0") {
      params.searchParams.delete("page");
    }
    navigate(`/games${params.search}`);
  };

  return (
    <>
      <GamesSearch handleGameNameChange={handleGameNameChange} />
      {isLoading ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : count === 0 || !games.length ? (
        <div className="flex justify-center">
          <NotFound
            message="No games found"
            className="p-5 text-2xl font-bold text-center rounded-lg text-error"
          />
        </div>
      ) : (
        games.map((game) => <GameCard key={game.id} game={game} />)
      )}
      <GamesPagination
        page={page}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
      />
    </>
  );
};
