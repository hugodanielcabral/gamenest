import propTypes from "prop-types";
import ReactPlayer from "react-player";
import { Button } from "../../../ui/index.js";
import { tabsGameDetailsMediaData } from "../../../../utils/getGameDetailsMediaIcons.jsx";
import { useNavigate } from "react-router-dom";
import { CardBackground } from "../../../ui/cardBackground/cardBackground.jsx";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useCheckGameInCollection } from "../../../../hooks/useCheckGameInCollection.js";

export const GameDetailsMedia = ({
  data,
  handleOnClick,
  activeTab,
  gameSlug,
}) => {
  const navigate = useNavigate();
  const { gameInCollection, isLoading } = useCheckGameInCollection(gameSlug);
  const gameCover =
    data?.cover?.url.replace("t_thumb", "t_1080p") ||
    "https://via.placeholder.com/300x400?text=No+Cover+Available";

  let navigateTo = gameInCollection
    ? `/collection/`
    : `/collection/add/${gameSlug}`;
  let buttonText = gameInCollection
    ? "Already on collection"
    : "Add to Collection";

  console.log(isLoading);

  return (
    <div className="grid grid-cols-4 gap-4 items-stretch">
      <div className="col-span-4 md:col-span-1 flex flex-col gap-3">
        <img
          className="flex-grow shadow-2xl shadow-black"
          src={gameCover}
          alt={`Cover of ${data?.name}`}
        />
        <Button
          className={clsx(
            "w-full font-semibold text-lg transition-all duration-300 ease-in-out disabled:opacity-50 disabled:bg-gray-500 disabled:cursor-not-allowed",
            gameInCollection
              ? "bg-success hover:bg-success hover:bg-opacity-70 text-white"
              : "bg-info hover:bg-info hover:bg-opacity-70 text-white"
          )}
          disabled={isLoading}
          onClick={() => navigate(navigateTo)}
        >
          {isLoading ? "Loading..." : buttonText}
        </Button>
      </div>
      <div className="col-span-4 md:col-span-3 flex flex-col gap-3">
        {data?.videos ? (
          <div className="flex-grow min-h-[200px] md:min-h-[300px] shadow-2xl shadow-black h-[500px]">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${data.videos[0].video_id}`}
              light={true}
              width={"100%"}
              height={"100%"}
              controls={true}
              muted={true}
            />
          </div>
        ) : (
          <div className="flex-grow min-h-[200px] md:min-h-[300px] shadow-2xl shadow-black">
            <img
              src="https://via.placeholder.com/600x200?text=No+Video+Available"
              alt="No Video Available"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <CardBackground className="overflow-auto h-28 rounded-md">
          <h3 className="text-center text-lg md:text-xl font-semibold text-error">
            Summary
          </h3>
          <p className="text-pretty text-base md:text-xl text-white">
            {data?.summary?.length > 0 ? (
              data.summary
            ) : (
              <p className="text-center mt-2">No description available.</p>
            )}
          </p>
        </CardBackground>
      </div>
      <div className="col-span-4 my-2">
        <div
          role="tablist"
          className="tabs tabs-bordered gap-4 flex flex-wrap justify-center items-center *:w-[150px] md:w-auto"
        >
          {tabsGameDetailsMediaData.map((tab) => (
            <a
              key={tab.id}
              role="tab"
              onClick={() => handleOnClick(tab.id)}
              className={`tab flex-grow text-base md:text-xl  ${
                tab.id === activeTab
                  ? "tab-active text-info font-bold"
                  : "text-white "
              }`}
            >
              {tab.icon}
              <span className="ml-2">{tab.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

GameDetailsMedia.propTypes = {
  data: propTypes.object.isRequired,
  handleOnClick: propTypes.func.isRequired,
  activeTab: propTypes.number.isRequired,
};
