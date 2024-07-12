import clsx from "clsx";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { FaTrophy } from "react-icons/fa6";

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
            {
              "bg-gray-700": selectedAchievement === achievement && !isAchieved,
              "bg-gray-700 ":selectedAchievement === achievement && isAchieved,
            },
            "h-42 relative cursor-pointer space-y-2 border border-gray-700 p-4 first:rounded-t-md last:rounded-b-md hover:bg-opacity-50",
            isAchieved
              ? "bg-base-100 hover:bg-gray-700"
              : "relative bg-base-100 hover:bg-gray-700 hover:bg-opacity-50",
          )}
          onClick={() => setSelectedAchievement(achievement)}
        >
          <h3
            className={`text-sm ${isAchieved ? "font-bold text-white" : "text-white"} sm:text-base md:text-lg`}
          >
            {achievement.displayName}
          </h3>
          <img
            src={isAchieved ? achievement.icon : achievement.icongray}
            alt={achievement.name}
            className="mx-auto h-12 w-12 rounded-md sm:h-16 sm:w-16 md:h-20 md:w-20"
          />
          <p
            className={`text-xs ${isAchieved ? "text-white" : ""} sm:text-sm md:text-base`}
          >
            {achievement.description}
          </p>
          {isAchieved ? (
            <p className="absolute right-3 top-0 text-yellow-300">
              <FaTrophy size={30} />
            </p>
          ) : (
            <p className="absolute right-3 top-0 text-gray-400">
              <FaTrophy size={30} />
            </p>
          )}
        </div>
      ))}
    </ul>
  );
};
