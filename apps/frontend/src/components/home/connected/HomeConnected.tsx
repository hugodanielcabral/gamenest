import { HomePopularGames } from "./popular/HomePopularGames.tsx";
import { HomeReleasedGames } from "./released/HomeReleasedGames.tsx";

export const HomeConnected = () => {
  return (
    <div className="min-h-screen space-y-10">
      <HomePopularGames />
      <HomeReleasedGames />
    </div>
  );
};
