import { HomeLatestGames } from "./latests/HomeLatestGames";
import { HomePopularGames } from "./popular/HomePopularGames";

export const HomeConnected = () => {
  return (
    <>
      <HomeLatestGames />
      <HomePopularGames />
    </>
  );
};
