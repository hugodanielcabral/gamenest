import { useParams } from "react-router-dom";
import { useDataFetch } from "../../../../../hooks/useDataFetch";
import { useState } from "react";
import { Achievements } from "./achievements/Achievements";
import { AchievementManager } from "./manager/AchievementManager";
import clsx from "clsx";

interface ContentAchievementProps {
  fetchData: {
    steamData?: {
      achievements: {
        name: string;
        displayName: string;
        description: string;
        icon: string;
        icongray: string;
      }[];
    };
  };
  isLoading: boolean;
}

interface UserAchievements {
  fetchData: {
    achievement_name: string[];
  }[];
}

export const ContentAchievement = () => {
  const { gameSlug } = useParams<{ gameSlug: string }>();
  const { fetchData: achievementData, isLoading } = useDataFetch(
    `/games/${gameSlug}`,
  ) as ContentAchievementProps;
  const { fetchData: userAchievements } = useDataFetch(
    `achievement/${gameSlug}`,
  ) as UserAchievements;
  const [currentTab, setCurrentTab] = useState("achievements");

  if (isLoading) {
    return (
      <div className="flex justify-center font-nunito text-2xl font-bold text-warning md:text-4xl">
        Cargando logros...
      </div>
    );
  }
  
  return achievementData?.steamData?.achievements ? (
    <div className="rounded-lg bg-base-300 p-4">
      <div role="tablist" className="tabs tabs-bordered">
        <a
          role="tab"
          className={clsx("tab text-base text-gray-400 md:text-lg lg:text-xl", {
            "tab-active text-white": currentTab === "achievements",
          })}
          onClick={() => {
            setCurrentTab("achievements");
          }}
        >
          Logros
        </a>
        <a
          role="tab"
          className={clsx("tab text-base text-gray-400 md:text-lg xl:text-xl", {
            "tab-active text-white": currentTab === "manager",
          })}
          onClick={() => {
            setCurrentTab("manager");
          }}
        >
          Gestor de logros
        </a>
      </div>

      {currentTab === "achievements" ? (
        <Achievements achievements={achievementData?.steamData?.achievements} />
      ) : (
        <AchievementManager
          achievements={achievementData?.steamData?.achievements}
          gameSlug={gameSlug}
          userAchievements={userAchievements || []}
        />
      )}
    </div>
  ) : (
    <div className="flex justify-center font-nunito text-2xl font-bold text-warning md:text-4xl">
      No hay logros disponibles
    </div>
  );
};
