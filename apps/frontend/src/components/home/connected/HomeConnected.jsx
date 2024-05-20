import { HomeLatestGames } from "./latests/HomeLatestGames";
import { HomePopularGames } from "./popular/HomePopularGames";

export const HomeConnected = () => {
  return (
    <>
      <div className="bg-base-300">
        <HomeLatestGames />
      </div>
      <HomePopularGames />
    </>
  );
};
