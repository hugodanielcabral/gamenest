import { HomeLatestGames } from "./latests/HomeLatestGames";
import { HomePopularGames } from "./popular/HomePopularGames";
import { HomeComingSoon } from "../comingSoon/HomeComingSoon";

export const HomeConnected = () => {
  return (
    <>
      <HomeLatestGames />
      <HomePopularGames />
      <HomeComingSoon />
    </>
  );
};
