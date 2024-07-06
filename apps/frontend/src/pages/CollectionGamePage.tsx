import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Layout } from "../components/layout/Layout";
import { BackgroundImage } from "../components/ui/backgroundImage/BackgroundImage";
import { GamePageAchievementManager } from "../components/collection/gamePage/achievementManager/GamePageAchievementManager.js";
import { GamePageSteamAchievement } from "../components/collection/gamePage/steamAchievement/GamePageSteamAchievement.js";
import { GiAchievement } from "react-icons/gi";
import { GrAchievement } from "react-icons/gr";
import getImageUrl from "../utils/getImageUrl.js";
import gameDetailsBg from "../assets/backgrounds/gamesdetails-background.webp";
import clsx from "clsx";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const CollectionGamePage = () => {
  const { gameSlug } = useParams<{ gameSlug: string }>();
  const { data: gameData, isLoading: isLoadingGameData } = useFetch(
    `${BASE_URL}/games/${gameSlug}`,
  );
  const [tabAchievement, setTabAchievement] = useState("achievement");

  if (isLoadingGameData) {
    return null;
  }

  let backgroundImg = gameData?.steamData?.background;

  if (!backgroundImg) {
    backgroundImg = getImageUrl(
      gameData.screenshots[0]?.url,
      "t_screenshot_med_2x",
      "t_thumb",
    );
  }

  return (
    <Layout>
      <BackgroundImage
        backgroundImage={backgroundImg ? backgroundImg : gameDetailsBg}
        className={clsx({
          "gradient-mask-b-[rgb(9,9,9,9)_0%,rgb(0,0,0,0.4)_0%,rgb(9,9,9,9)_80%]":
            gameData?.steamData?.background,
        })}
      >
        <div
          role="tablist"
          className="tabs tabs-bordered mb-1 *:text-base *:sm:text-lg *:md:text-xl"
        >
          <a
            role="tab"
            className={`tab ${tabAchievement === "achievement" ? "tab-active font-bold text-white" : ""}`}
            onClick={() => setTabAchievement("achievement")}
          >
            <GiAchievement className="mr-2 inline-block opacity-70" /> Logros
          </a>
          <a
            role="tab"
            className={`tab ${tabAchievement === "achievementManager" ? "tab-active font-bold text-white" : ""}`}
            onClick={() => setTabAchievement("achievementManager")}
          >
            <GrAchievement className="mr-2 inline-block opacity-70" /> Gestor de
            logros
          </a>
        </div>

        {tabAchievement === "achievement" && (
          <GamePageSteamAchievement gameData={gameData} gameSlug={gameSlug} />
        )}

        {tabAchievement === "achievementManager" &&
          gameData?.steamData?.achievements && (
            <GamePageAchievementManager
              gameData={gameData}
              gameSlug={gameSlug}
            />
          )}
      </BackgroundImage>
    </Layout>
  );
};
