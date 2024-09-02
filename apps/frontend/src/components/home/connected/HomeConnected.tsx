import { HomePopularGames } from "./popular/HomePopularGames.tsx";
import { HomeReleasedGames } from "./released/HomeReleasedGames.tsx";


export const HomeConnected = () => {
  

  return (
    <div className="min-h-screen space-y-10 bg-gradient-to-b from-gray-800 from-0% to-base-300 p-4">
      <HomePopularGames />
      <HomeReleasedGames />
    </div>
  );
};
