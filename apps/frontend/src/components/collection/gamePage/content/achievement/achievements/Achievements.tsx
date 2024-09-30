import type { SteamAchievement } from "../../../../../../types/steamAchievement";

export const Achievements = ({ achievements }: SteamAchievement) => {
  
  return (
    <div className="mt-2 space-y-4">
      {achievements?.map((achievement) => (
        <div
          key={achievement.name}
          className="flex gap-2 rounded-lg border border-gray-700 bg-base-100 p-2"
        >
          <img src={achievement.icon} alt={achievement.displayName} className="h-12 sm:h-14 md:h-16 lg:h-20"/>
          <div className="space-y-1">
            <h3 className="font-nunito text-sm text-white md:text-base lg:text-lg">
              {achievement.displayName}
            </h3>
            <p className="line-clamp-2 text-pretty font-nunito text-xs text-gray-400 md:text-sm lg:text-base">
              {achievement.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
