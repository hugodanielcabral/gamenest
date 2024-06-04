import { useParams } from "react-router-dom";
import { GameDetailsHeader } from "./header/GameDetailsHeader";
import { GameDetailsMedia } from "./media/GameDetailsMedia";
import { useState } from "react";
import { GameDetailsMediaGallery } from "./gallery/GameDetailsMediaGallery";
import { Layout } from "../../layout/Layout";
import getImageUrl from "../../../utils/getImageUrl.js";
import gameDetailsBg from "../../../assets/backgrounds/gamesdetails-background.webp";
import { GameDetailsSkeleton } from "./skeleton/GameDetailsSkeleton.jsx";
import { useFetch } from "../../../hooks/useFetch.ts";
import { BackgroundImage } from "../../ui/index.js";

export const GameDetails = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { gameId: gameSlug } = useParams();
  const { data, isLoading } = useFetch(`${BASE_URL}/games/${gameSlug}`);
  const [activeTab, setActiveTab] = useState(1);
  const handleOnClick = (tab) => {
    setActiveTab(tab);
  };

  let gameScreenshot;

  if (data?.screenshots?.length) {
    gameScreenshot = getImageUrl(
      data.screenshots[0]?.url,
      "t_screenshot_huge",
      "t_thumb"
    );
  } else {
    gameScreenshot = gameDetailsBg;
  }

  return !isLoading ? (
    <Layout>
      <BackgroundImage backgroundImage={gameScreenshot}>
        <div className="relative z-10 p-4 container mx-auto">
          {/* Header */}
          <div className="my-2">
            <GameDetailsHeader data={data} />
          </div>
          {/* Cover, Trailer, Add to Collection button, Brief description and Tabs */}
          <div className="my-2 mx-auto">
            <GameDetailsMedia
              data={data}
              handleOnClick={handleOnClick}
              activeTab={activeTab}
              gameSlug={gameSlug}
            />
          </div>
          {/* Screenshots, Videos, Artworks and Additional info */}
          <div className="my-2 mx-auto grid grid-cols-4 gap-3">
            <GameDetailsMediaGallery data={data} activeTab={activeTab} />
          </div>
        </div>
      </BackgroundImage>
    </Layout>
  ) : (
    <GameDetailsSkeleton />
  );
};
