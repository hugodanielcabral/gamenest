import { useFetchGames } from "../../../hooks/useFetchGames.js";
import { Loading } from "../../ui/loading/Loading.jsx";
import { GameCard } from "../gameshome/card/GameCard.jsx";

export const GamesHome = () => {
  const { games, isLoading } = useFetchGames();
  console.log(games);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : (
        games.map((game) => <GameCard key={game.id} game={game} />)
      )}
    </>
  );
};
