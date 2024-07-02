import clsx from "clsx";
import { useEffect, useState } from "react";

type SteamAchievement = {
  name: string;
  displayName: string;
  description: string;
  icon: string;
  icongray: string;
};

type GamePageAchievementManagerProps = {
  gameData: {
    steamData: {
      achievements: SteamAchievement[];
    };
  };
};

export const GamePageAchievementManager = ({
  gameData,
}: GamePageAchievementManagerProps) => {
  const [unachievedAchievements, setUnachievedAchievements] = useState<
    SteamAchievement[]
  >([]);
  const [achievedAchievements, setAchievedAchievements] = useState<
    SteamAchievement[]
  >([]);
  const [selectedAchievement, setSelectedAchievement] =
    useState<SteamAchievement | null>(null);

  useEffect(() => {
    if (gameData?.steamData?.achievements) {
      setUnachievedAchievements(gameData.steamData.achievements);
    }
  }, [gameData]);

  const handleOnMoveToAchievedAchievements = () => {
    if (!selectedAchievement) return;

    const foundAchievement = achievedAchievements.find(
      (achievement) => achievement.name === selectedAchievement.name,
    );

    if (foundAchievement) {
      setSelectedAchievement(null);
      return;
    }

    setAchievedAchievements((prev) =>
      [...prev, selectedAchievement].sort((a, b) => {
        if (a.name < b.name) return -1;

        if (a.name > b.name) return 1;

        return 0;
      }),
    );

    const filteredAchievement = unachievedAchievements.filter(
      (achievement) => achievement.name !== selectedAchievement.name,
    );
    setUnachievedAchievements(filteredAchievement);
    setSelectedAchievement(null);
  };

  const handleOnMoveToUnachievedAchievements = () => {
    if (!selectedAchievement) return;

    const foundAchievement = unachievedAchievements.find(
      (achievement) => achievement.name === selectedAchievement.name,
    );

    if (foundAchievement) {
      setSelectedAchievement(null);
      return;
    }

    setUnachievedAchievements((prev) =>
      [...prev, selectedAchievement].sort((a, b) => {
        if (a.name < b.name) return -1;

        if (a.name > b.name) return 1;

        return 0;
      }),
    );
    const filteredAchievement = achievedAchievements.filter(
      (achievement) => achievement.name !== selectedAchievement.name,
    );
    setAchievedAchievements(filteredAchievement);
    setSelectedAchievement(null);
  };

  return (
    <>
      <div className="flex bg-base-200 bg-opacity-50 p-6 rounded-md">
        <div className="flex-1">
          <h2 className="text-center text-xl text-white">No obtenidos</h2>
          <ul className="h-96 overflow-auto">
            {unachievedAchievements.map((achievement: SteamAchievement) => (
              <div
                key={achievement.name}
                className={clsx(
                  { "bg-base-300": selectedAchievement === achievement },
                  "border border-gray-700 bg-base-100 p-4 first:rounded-t-md last:rounded-b-md hover:bg-base-100 hover:bg-opacity-50 h-42 space-y-2 cursor-pointer",
                )}
                onClick={() => setSelectedAchievement(achievement)}
              >
                <h3 className="text-sm sm:text-base md:text-lg">{achievement.displayName}</h3>
                <img src={achievement.icongray} alt={achievement.name} className="rounded-md"/>
                <p className="text-xs sm:text-sm md:text-base italic">{achievement.description}</p>
              </div>
            ))}
          </ul>
        </div>
        <div className="flex items-center flex-col justify-center">
          <button
            className="btn btn-accent"
            onClick={handleOnMoveToUnachievedAchievements}
          >
            ⬅️
          </button>
          <button
            className="btn btn-warning"
            onClick={handleOnMoveToAchievedAchievements}
          >
            ➡️
          </button>
        </div>
        <div className="flex-1">
          <h2 className="text-center text-xl text-white">Obtenidos</h2>
          <ul className="h-96 overflow-auto">
            {achievedAchievements.map((achievement: SteamAchievement) => (
              <div
                key={achievement.name}
                className={clsx(
                  { "bg-blue-400 bg-opacity-50": selectedAchievement === achievement },
                  "border border-gray-700 bg-blue-500 p-4 first:rounded-t-md last:rounded-b-md hover:bg-blue-400 hover:bg-opacity-50 h-42 space-y-2 cursor-pointer",
                )}
                onClick={() => setSelectedAchievement(achievement)}
              >
                <h3 className="text-sm sm:text-base md:text-lg text-white">{achievement.displayName}</h3>
                <img src={achievement.icon} alt={achievement.name} className="rounded-md"/>
                <p className="text-xs sm:text-sm md:text-base italic text-white">{achievement.description}</p>
              </div>
            ))}
          </ul>
        </div>
      </div>
      <button className="btn btn-accent mt-5">Guardar cambios</button>
    </>
  );
};
