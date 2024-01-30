import { useFetchGames } from "../../../../hooks/useFetchGames.js";
import { Link } from "react-router-dom";
import { Loading } from "../../../ui/loading/Loading.jsx";
import "./GamesHomeCard.css";

export const GamesHomeCard = () => {
  const { games, isLoading } = useFetchGames();
  console.log(games);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : (
        games.map((game) => {
          return (
            <Link key={game.id} to={`/games/${game.id}`}>
              <div className="flex items-center justify-between p-3 my-5 transition duration-500 ease-in-out rounded-lg shadow-lg cursor-pointer bg-white-color hover:shadow-xl hover:saturate-50">
                <div className="flex flex-1 gap-x-3">
                  <img
                    src={game.cover.url.replace("t_thumb", "t_1080p")}
                    alt={`${game.name} cover`}
                    className="object-cover w-20 h-full md:w-36 md:h-full"
                  />
                  <div className="flex-1">
                    <h2 className="font-bold text-balance line-clamp-1">
                      {game.name}
                    </h2>
                    <ul className="flex justify-start gap-4 my-1">
                      {game.platforms
                        .filter((platform) => platform.abbreviation != null)
                        .map((platform) => {
                          return (
                            <li key={platform.id} className="text-red-color ">
                              {platform.abbreviation}
                            </li>
                          );
                        })}
                    </ul>
                    <p className="line-clamp-2 lg:line-clamp-3">
                      {game.summary}
                    </p>
                  </div>
                </div>
                <div
                  className={`hidden p-6 text-2xl font-bold rounded-full md:block ${
                    game.rating > 49 ? "bg-green-tag-football" : "bg-red-color"
                  } text-white-color`}
                >
                  {Math.round(game.rating)}
                </div>
              </div>
            </Link>
          );
        })
      )}
    </>
  );
};
