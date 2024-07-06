import clsx from "clsx";

type SteamAchievement = {
  name: string;
  displayName: string;
  description: string;
  icon: string;
  icongray: string;
};

type SteamAchievementListProps = {
  achievement: SteamAchievement;
  achievedAchievements: SteamAchievement[];
};

export const SteamAchievementList = ({
  achievement,
  achievedAchievements,
}: SteamAchievementListProps) => {
  const isAchieved = achievedAchievements.includes(achievement);

  return (
    <div className={clsx(
        {
            "bg-blue-600 hover:bg-blue-500": isAchieved
        },
        "h-42 cursor space-y-2 rounded-md border border-gray-700 bg-base-100 p-4 hover:bg-gray-700 hover:bg-opacity-50 transition-colors duration-300 ease-in-out"
    )}>
      <h3
        className={clsx(
          {
            "font-bold": isAchieved,
          },
          "text-white sm:text-base md:text-lg",
        )}
      >
        {achievement.displayName}
      </h3>
      <img
        src={isAchieved ? achievement.icon : achievement.icongray}
        alt={achievement.name}
        className="mx-auto h-12 w-12 rounded-md sm:h-16 sm:w-16 md:h-20 md:w-20"
      />
      <p className={clsx({
        "text-white": isAchieved,
      }, "text-sx sm:text-sm md:text-base")}>
        {achievement.description}
      </p>
    </div>
  );
};
