import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  GameDetailsMedia,
  GameDetailsInfo,
  GameDetailsReleaseDates,
  GameDetailsAgeRating,
  GameDetailsHeader,
  GameDetailsGallery,
} from "./index.js";
import { useFetchGameDetails } from "../../../hooks/useFetchGameDetails.js";
import { Loading } from "../../ui/loading/Loading.jsx";

export const GameDetails = () => {
  const { gameId } = useParams();
  const { game, isLoading } = useFetchGameDetails(gameId);
  const [activeTab, setActiveTab] = useState("overview");

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <>
            <GameDetailsMedia game={game} />
            <GameDetailsInfo game={game} />
            <GameDetailsReleaseDates game={game} />
            <GameDetailsAgeRating game={game} />
          </>
        );
      case "media":
        return <GameDetailsGallery game={game} />;
      default:
        return null;
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="container p-4 mx-auto">
      <GameDetailsHeader game={game} />
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setActiveTab("overview")}
          className={`${
            activeTab === "overview" ? "bg-gray-900 text-white" : ""
          } px-4 py-2 rounded-md`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("media")}
          className={`${
            activeTab === "media" ? "bg-gray-600 text-white" : ""
          } px-4 py-2 rounded-md`}
        >
          Gallery
        </button>
      </div>
      {renderTabContent()}
    </div>
  );
};
