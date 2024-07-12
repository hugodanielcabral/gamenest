import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Layout } from "../components/layout/Layout";
import { GamePageAchievementManager } from "../components/collection/gamePage/achievementManager/GamePageAchievementManager.js";
import { GamePageSteamAchievement } from "../components/collection/gamePage/steamAchievement/GamePageSteamAchievement.js";
import { GiAchievement } from "react-icons/gi";
import { FaListCheck } from "react-icons/fa6";
import { GamePageDetails } from "../components/collection/gamePage/details/GamePageDetails.js";
import { CollectionGamePageSkeleton } from "../components/collection/gamePage/skeleton/CollectionGamePageSkeleton.js";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const CollectionGamePage = () => {
  const { gameSlug } = useParams<{ gameSlug: string }>();
  const { data: gameData, isLoading: isLoadingGameData } = useFetch(
    `${BASE_URL}/games/${gameSlug}`,
  );
  const [tabAchievement, setTabAchievement] = useState("achievement");
  const navigate = useNavigate();

  if (isLoadingGameData) {
    return <CollectionGamePageSkeleton />;
  }

  if (!gameData) {
    navigate("/404");
    return null;
  }

  return (
    <Layout className="bg-gradient-to-r from-blue-900 from-25% via-black via-60% to-blue-900 p-8">
      <div className="container relative z-10 mx-auto space-y-10">
        <GamePageDetails gameSlug={gameSlug} />
        {gameData?.steamData?.achievements && (
          <div>
            <div
              role="tablist"
              className="tabs tabs-bordered mb-1 *:text-base *:sm:text-lg *:md:text-xl"
            >
              <a
                role="tab"
                className={`tab ${tabAchievement === "achievement" ? "tab-active font-bold text-white" : ""}`}
                onClick={() => setTabAchievement("achievement")}
              >
                <GiAchievement className="mr-2 inline-block opacity-70" />{" "}
                Logros
              </a>
              <a
                role="tab"
                className={`tab ${tabAchievement === "achievementManager" ? "tab-active font-bold text-white" : ""}`}
                onClick={() => setTabAchievement("achievementManager")}
              >
                <FaListCheck className="mr-2 inline-block opacity-70" /> Gestor
                de logros
              </a>
            </div>
            {tabAchievement === "achievement" && (
              <GamePageSteamAchievement
                gameData={gameData}
                gameSlug={gameSlug}
              />
            )}

            {tabAchievement === "achievementManager" &&
              gameData?.steamData?.achievements && (
                <GamePageAchievementManager
                  gameData={gameData}
                  gameSlug={gameSlug}
                />
              )}
          </div>
        )}
      </div>
    </Layout>
  );
};
