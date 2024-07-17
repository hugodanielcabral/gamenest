import { useParams } from "react-router-dom";
import { GameDetailsHeader } from "./header/GameDetailsHeader";
import { GameDetailsMedia } from "./media/GameDetailsMedia";
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

  let gameScreenshot;

  if (data?.screenshots?.length) {
    gameScreenshot = getImageUrl(
      data.screenshots[0]?.url,
      "t_screenshot_huge",
      "t_thumb",
    );
  } else {
    gameScreenshot = gameDetailsBg;
  }

  return !isLoading ? (
    <Layout>
      <BackgroundImage backgroundImage={gameScreenshot}>
        <div className="container relative z-10 mx-auto p-4">
          {/* Header */}
          <div className="my-2">
            <GameDetailsHeader data={data} />
          </div>
          {/* Cover, Trailer, Add to Collection button, Brief description and Tabs */}
          <div className="mx-auto my-2">
            <GameDetailsMedia data={data} gameSlug={gameSlug} />
          </div>
          {/* Screenshots, Videos, Artworks and Additional info */}
          <div className="mx-auto my-2 grid grid-cols-4 gap-3">
            <GameDetailsMediaGallery data={data} />
          </div>
        </div>
      </BackgroundImage>
    </Layout>
  ) : (
    <GameDetailsSkeleton />
  );
};
