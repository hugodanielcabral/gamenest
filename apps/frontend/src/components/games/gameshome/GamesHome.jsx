import { useFetchGames } from "../../../hooks/useFetchGames.js";
import { useNavigate } from "react-router-dom";
import { GameCard } from "../gameshome/card/GameCard.jsx";
import { Loading } from "../../ui/loading/Loading.jsx";
import { GamesPagination } from "./pagination/GamesPagination.jsx";
export const GamesHome = () => {
  const { games, isLoading, setPage, page } = useFetchGames();
  const navigate = useNavigate();

  const handlePageChange = (newPage) => {
    setPage(newPage);
    navigate(`?page=${newPage}`);
  };
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : (
        games.map((game) => <GameCard key={game.id} game={game} />)
      )}
      <GamesPagination page={page} handlePageChange={handlePageChange} />
    </>
  );
};
