import { useSteamAchievement } from "../../../../hooks/useSteamAchievement";
import { SteamAchievementList } from "./list/SteamAchievementList";

type SteamAchievement = {
  name: string;
  displayName: string;
  description: string;
  icon: string;
  icongray: string;
};

type GamePageSteamAchievementProps = {
  gameData: {
    steamData: {
      achievements: SteamAchievement[];
    };
  };
  gameSlug: string;
};

export const GamePageSteamAchievement = ({
  gameData,
  gameSlug,
}: GamePageSteamAchievementProps) => {
  const { achievedAchievements } = useSteamAchievement(gameData, gameSlug);

  return (
    <div className="grid max-h-screen gap-1 overflow-auto rounded-md bg-base-200 bg-opacity-50 p-6 md:grid-cols-2">
      <h2 className="col-span-2 text-center text-base text-white sm:text-lg md:text-xl">
        Logros obtenidos:{" "}
        <span className="text-blue-500">{achievedAchievements?.length}</span> de{" "}
        <span className="text-red-500">
          {gameData?.steamData?.achievements.length}
        </span>
      </h2>
      {gameData?.steamData?.achievements.map(
        (achievement: SteamAchievement) => (
          <SteamAchievementList
            key={achievement.name}
            achievement={achievement}
            achievedAchievements={achievedAchievements}
          />
        ),
      )}
    </div>
  );
};
