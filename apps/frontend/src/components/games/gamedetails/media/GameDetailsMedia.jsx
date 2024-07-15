import propTypes from "prop-types";
import { Button } from "../../../ui/index.js";
import { Link, useNavigate } from "react-router-dom";
import { useCheckGameInCollection } from "../../../../hooks/useCheckGameInCollection.js";
import { CardBackground } from "../../../ui/cardBackground/CardBackground.jsx";
import { useAuth } from "../../../../context/AuthContext.jsx";
import { retrieveGameSummary } from "../../../../utils/gameDetailsUtils.js";
import { tabsGameDetailsMediaData } from "../../../../constants/gamedetails/websiteicons.js";
import { CardImage } from "../../../ui/card/image/CardImage.tsx";
import clsx from "clsx";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import "./GameDetailsMedia.css";
import { MediaList } from "./list/MediaList.tsx";
import { Tooltip } from "../../../ui/tooltip/Tooltip.tsx";
import { getWebSiteIcons } from "../../../../utils/getWebSiteIcons.js";
import { getPlatformsIcons } from "../../../../utils/getPlatformsIcons.js";

export const GameDetailsMedia = ({
  data,
  handleOnClick,
  activeTab,
  gameSlug,
}) => {
  const { gameInCollection, isLoading } = useCheckGameInCollection(gameSlug);
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  const steam_short_description = data?.steamData?.short_description;
  const igdb_summary = data?.summary;

  const largeCoverUrl =
    data?.cover?.url.replace("t_thumb", "t_1080p") ||
    "https://via.placeholder.com/300x400?text=No+Cover+Available";

  let navigateTo = gameInCollection
    ? `/collection/`
    : `/collection/add/${gameSlug}`;
  let gameCollectionButtonLabel = gameInCollection
    ? "En tu colección"
    : "Agregar a la colección";

  const videoSrc = {
    type: "video",
    sources: [
      {
        src:
          `${data?.videos[0]?.video_id}` || "https://www.youtube.com/watch?v=0",
        provider: "youtube",
      },
    ],
  };

  console.log(data);

  return (
    <div className="mx-auto grid grid-cols-4 gap-4">
      <div className="col-span-4 flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-y-1">
          <CardImage
            src={largeCoverUrl}
            alt={`Cover de ${data?.name}`}
            className="h-56 w-40 sm:h-64 sm:w-48 md:h-72 md:w-56"
          />
          {isAuth && (
            <Button
              className={clsx(
                {
                  "bg-blue-400 text-black hover:bg-blue-500 hover:bg-opacity-90":
                    !gameInCollection,
                  "bg-success text-white hover:bg-success hover:bg-opacity-70":
                    gameInCollection,
                },
                "w-40 text-xs font-semibold transition-all duration-300 ease-in-out disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-50 sm:w-48 sm:text-sm md:w-56 md:text-base",
              )}
              disabled={isLoading}
              onClick={() => navigate(navigateTo)}
            >
              {isLoading ? "Cargando..." : gameCollectionButtonLabel}
            </Button>
          )}
        </div>
        <Plyr source={videoSrc} />
        <div className="flex flex-grow flex-col rounded-md border-2 border-gray-700 bg-base-100 bg-opacity-70 p-4 shadow-lg shadow-black">
          <div className="flex-grow justify-center space-y-2 rounded-md">
            <h3 className="text-center text-base uppercase tracking-wider text-blue-300 sm:text-sm md:text-lg">
              Sitios web
            </h3>
            <ul className="flex flex-wrap justify-center gap-4">
              {data?.websites ? (
                data.websites.map((website) => (
                  <Link key={website.id} to={website?.url} target="_blank">
                    <Tooltip text={getWebSiteIcons(website.category).name}>
                      <MediaList
                        key={website.id}
                        id={website.id}
                        url={website.url}
                        className={getWebSiteIcons(website.category).icon}
                      />
                    </Tooltip>
                  </Link>
                ))
              ) : (
                <p>No hay sitios web disponibles</p>
              )}
            </ul>
          </div>
          <div className="divider"></div>
          <div className="flex-grow justify-center space-y-2 rounded-md">
            <h3 className="text-center text-base tracking-wider text-blue-300 sm:text-sm md:text-lg">
              PLATAFORMAS
            </h3>
            <ul className="flex flex-wrap justify-center gap-4">
              {data?.platforms ? (
                data.platforms.map((platform) => (
                  <Tooltip key={platform.id} text={platform.name}>
                    <MediaList
                      id={platform.id}
                      name={platform.name}
                      className={getPlatformsIcons(platform.id).icon}
                    />
                  </Tooltip>
                ))
              ) : (
                <p>No hay plataformas disponibles</p>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="col-span-4 my-2">
        <CardBackground className="max-h-60 space-y-2 overflow-auto rounded-md border-2 border-gray-700 bg-base-100 bg-opacity-70 p-4 shadow-lg shadow-black">
          <h3 className="text-center text-base uppercase tracking-wider text-blue-300 sm:text-lg md:text-xl">
            Resumen
          </h3>

          {(
            <p className="text-sm text-white sm:text-lg md:text-xl">
              {steam_short_description
                ? retrieveGameSummary(steam_short_description, igdb_summary)
                : igdb_summary}
            </p>
          ) ?? <p className="mt-2 text-center">No hay resumen disponible.</p>}
        </CardBackground>
      </div>
      <div className="col-span-4 my-2">
        <div
          role="tablist"
          className="tabs tabs-bordered flex flex-wrap items-center justify-center gap-4 *:w-[150px] md:w-auto"
        >
          {tabsGameDetailsMediaData.map((tab) => (
            <a
              key={tab.id}
              role="tab"
              onClick={() => handleOnClick(tab.id)}
              className={`tab flex-grow ${
                tab.id === activeTab
                  ? "tab-active font-bold text-white"
                  : "text-gray-300"
              } transition-all duration-200 ease-in-out hover:text-white hover:text-opacity-70`}
            >
              <span className={tab.icon} />
              <span className={tab.textClassName}>{tab.name}</span>
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
  gameSlug: propTypes.string.isRequired,
};

GameDetailsMedia.defaultProps = {
  data: {},
  handleOnClick: () => {},
  activeTab: 1,
  gameSlug: "",
};
