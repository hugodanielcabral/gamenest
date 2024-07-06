import clsx from "clsx";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type SteamAchievement = {
    name: string;
    displayName: string;
    description: string;
    icon: string;
    icongray: string;
  };

type AchievementListProps = {
    achievements: SteamAchievement[];
    selectedAchievement: SteamAchievement | null;
    setSelectedAchievement: (achievement: SteamAchievement | null) => void;
    isAchieved: boolean;
  };
export const AchievementManagerList = ({
    achievements,
    selectedAchievement,
    setSelectedAchievement,
    isAchieved,
  }: AchievementListProps) => {

    const [parent, enableAnimations] = useAutoAnimate();

  return (
    <ul className="max-h-screen overflow-auto" ref={parent}>
      {achievements.map((achievement: SteamAchievement) => (
        <div
          key={achievement.name}
          className={clsx(
            { "bg-gray-700": selectedAchievement === achievement && !isAchieved,
              "bg-blue-500 bg-opacity-50": selectedAchievement === achievement && isAchieved },
            "h-42 cursor-pointer space-y-2 border border-gray-700 p-4 first:rounded-t-md last:rounded-b-md hover:bg-opacity-50",
            isAchieved ? "bg-blue-600 hover:bg-blue-400" : "bg-base-100 hover:bg-gray-700 hover:bg-opacity-50"
          )}
          onClick={() => setSelectedAchievement(achievement)}
        >
          <h3 className={`text-sm ${isAchieved ? "text-white font-bold" : "text-white"} sm:text-base md:text-lg`}>
            {achievement.displayName}
          </h3>
          <img
            src={isAchieved ? achievement.icon : achievement.icongray}
            alt={achievement.name}
            className="rounded-md mx-auto w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
          />
          <p className={`text-xs ${isAchieved ? "text-white" : ""} sm:text-sm md:text-base`}>
            {achievement.description}
          </p>
        </div>
      ))}
    </ul>
  )
}
