import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  GameDetailsOverview,
  GameDetailsHeader,
  GameDetailsGallery,
} from "./index.js";
import { useFetchGameDetails } from "../../../hooks/useFetchGameDetails.js";
import { Loading } from "../../ui/loading/Loading.jsx";
import "./GameDetails.css";

export const GameDetails = () => {
  const { gameId: gameSlug } = useParams();
  const { game, isLoading } = useFetchGameDetails(gameSlug);
  const [activeTab, setActiveTab] = useState("overview");

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <GameDetailsOverview game={game} />;
      case "media":
        return <GameDetailsGallery game={game} />;
      default:
        return null;
    }
  };

  console.log(game);

  return isLoading ? (
    <Loading />
  ) : (
    <div
      className={`p-4 min-h-[100vh] bg-no-repeat bg-cover bg-center bg-fixed bg-opacity-50 bg-blur-3xl bg-gradient-to-b from-base-100 to-base-200`}
      style={
        game.screenshots && {
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%), url(${game.screenshots[0].url.replace(
            "t_thumb",
            "t_screenshot_huge"
          )})`,
        }
      }
    >
      <div className="container mx-auto">
        <GameDetailsHeader game={game} />
        <div
          role="tablist"
          className="tabs tabs-bordered tabs-lg *:font-bold bg-base-200"
        >
          <button
            role="tab"
            className={`tab ${
              activeTab === "overview" && "tab-active text-info"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          {game.screenshots || game.videos ? (
            <button
              role="tab"
              className={`tab ${
                activeTab === "media" && "tab-active text-info"
              }`}
              onClick={() => setActiveTab("media")}
            >
              Media
            </button>
          ) : null}
          <button role="tab" className="tab" disabled>
            Reviews
          </button>
        </div>
        {renderTabContent()}
      </div>
    </div>
  );
};
