import { HomePopularGames } from "./popular/HomePopularGames.tsx";
import { HomeReleasedGames } from "./released/HomeReleasedGames.tsx";

export const HomeConnected = () => {
  return (
    <div className="min-h-screen space-y-10 bg-gradient-to-r from-blue-900 from-25% via-black via-60% to-blue-900 p-8">
      <HomePopularGames />
      <HomeReleasedGames />
    </div>
  );
};
