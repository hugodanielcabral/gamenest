import { useFetch } from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { GameDetailsHeader } from "./header/GameDetailsHeader";
import { GameDetailsMedia } from "./media/GameDetailsMedia";
import { Loading } from "../../ui";
import { useState } from "react";
import { GameDetailsMediaGallery } from "./galleri/GameDetailsMediaGallery";

export const GameDetails = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const { gameId: gameSlug } = useParams();
  const { data, isLoading } = useFetch(`${BASE_URL}/games/${gameSlug}`);
  const [activeTab, setActiveTab] = useState(1);
  const handleOnClick = (tab) => {
    setActiveTab(tab);
  };

  return !isLoading ? (
    <div className="min-h-screen">
      <img
        src={data?.screenshots[0]?.url.replace("t_thumb", "t_screenshot_huge")}
        className="w-full absolute left-0 right-0 gradient-mask-b-[rgb(0,0,0,1),rgb(0,0,0,0.5)_5%,rgb(0,0,0,0)]"
        alt={`Background of ${data?.name}`}
      />
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
          />
        </div>
        {/* Screenshots, Videos, Artworks and Additional info */}
        <div className="my-2 mx-auto grid grid-cols-4 gap-3">
          <GameDetailsMediaGallery data={data} activeTab={activeTab} />
        </div>
      </div>
    </div>
  ) : (
    <div className="container mx-auto h-screen flex items-center justify-center">
      <Loading />
    </div>
  );
};
