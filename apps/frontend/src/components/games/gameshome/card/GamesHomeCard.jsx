import { useFetchGames } from "../../../../hooks/useFetchGames.js";
import { Link } from "react-router-dom";

export const GamesHomeCard = () => {
  const { games, isLoading } = useFetchGames();
  console.log(games);

  return (
    <>
      {isLoading
        ? "Loading..."
        : games.map((game) => {
            return (
              <Link key={game.id} to={`/games/${game.id}`}>
                <div className="flex items-center justify-between p-3 my-5 transition duration-500 ease-in-out rounded-lg shadow-lg cursor-pointer bg-white_color hover:bg-grey_color hover:shadow-xl">
                  <div className="flex gap-x-5">
                    <img
                      src={game.cover.url.replace("t_thumb", "t_1080p")}
                      alt={`${game.name} cover`}
                      className="w-32 h-32"
                    />
                    <div>
                      <h2 className="text-3xl">{game.name}</h2>
                      <ul className="flex gap-3 mt-2">
                        {game.platforms.map((platform) => {
                          return (
                            <li
                              key={platform.id}
                              className="text-sm text-red_color"
                            >
                              {platform.name}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <div className="p-6 text-2xl font-bold rounded-full bg-green_tag_football text-white_color">
                    {Math.round(game.rating)}
                  </div>
                </div>
              </Link>
            );
          })}
    </>
  );
};
