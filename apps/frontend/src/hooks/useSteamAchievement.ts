import { useEffect, useState } from "react";

type SteamAchievement = {
  name: string;
  displayName: string;
  description: string;
  icon: string;
  icongray: string;
};

type gameData = {
  steamData: {
    achievements: SteamAchievement[];
  };
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useSteamAchievement = (gameData: gameData, gameSlug: string) => {
  const [unachievedAchievements, setUnachievedAchievements] = useState<
    SteamAchievement[]
  >([]);
  const [achievedAchievements, setAchievedAchievements] = useState<
    SteamAchievement[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (gameData?.steamData?.achievements) {
      setUnachievedAchievements(gameData.steamData.achievements);
    }
  }, [gameData]);

  const getUserAchievements = async () => {
    try {
      const response = await fetch(`${BASE_URL}/achievement/${gameSlug}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      });

      const data = await response.json();
      const unachievedAchievements = gameData?.steamData?.achievements.filter(
        (achievement) => {
          return !data[0].achievement_name.some(
            (userAchievement: string) => userAchievement === achievement.name,
          );
        },
      );

      setUnachievedAchievements(unachievedAchievements);

      const achievedAchievements = gameData?.steamData?.achievements.filter(
        (achievement) => {
          return data[0].achievement_name.some(
            (userAchievement: string) => userAchievement === achievement.name,
          );
        },
      );
      setAchievedAchievements(achievedAchievements);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserAchievements().then(() => setIsLoading(false));
  }, [gameSlug, gameData?.steamData?.achievements]);

  return {
    unachievedAchievements,
    achievedAchievements,
    isLoading,
    setUnachievedAchievements,
    setAchievedAchievements,
  };
};
