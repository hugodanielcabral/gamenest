import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Layout } from "../components/layout/Layout";
import { BackgroundImage } from "../components/ui/backgroundImage/BackgroundImage";
import getImageUrl from "../utils/getImageUrl.js";
import gameDetailsBg from "../assets/backgrounds/gamesdetails-background.webp";
import clsx from "clsx";
import { GamePageAchievementManager } from "../components/collection/gamePage/achievementManager/GamePageAchievementManager.js";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const CollectionGamePage = () => {
  const { gameSlug } = useParams<{ gameSlug: string }>();
  const { data: gameData, isLoading: isLoadingGameData } = useFetch(
    `${BASE_URL}/games/${gameSlug}`,
  );

  if (isLoadingGameData) {
    return <div>Cargando...</div>;
  }

  let backgroundImg = gameData?.steamData?.background;

  if (!backgroundImg) {
    backgroundImg = getImageUrl(
      gameData.screenshots[0]?.url,
      "t_screenshot_med_2x",
      "t_thumb",
    );
  }

  console.log(gameData?.steamData?.achievements);
  

  return (
    <Layout>
      <BackgroundImage
        backgroundImage={backgroundImg ? backgroundImg : gameDetailsBg}
        className={clsx({
          "gradient-mask-b-[rgb(9,9,9,9)_0%,rgb(0,0,0,0.4)_0%,rgb(9,9,9,9)_80%]":
            gameData?.steamData?.background,
        })}
      >
        {/*//* Seccíon logros  */}
        {/*   <div className="max-h-96 overflow-auto rounded-md border border-gray-500 bg-base-100">
          {gameData?.steamData?.achievements.map(
            (achievement: SteamAchievement) => (
              <div
                key={achievement.name}
                className="border border-base-100 bg-base-300 p-4"
              >
                <h1>{achievement.displayName}</h1>
                <img src={achievement.icongray} alt={achievement.name} />
                <p>{achievement.description}</p>
              </div>
            ),
          )}
        </div> */}

        {gameData?.steamData?.achievements && (
          <GamePageAchievementManager gameData={gameData} />
        )}
      </BackgroundImage>
    </Layout>
  );
};
