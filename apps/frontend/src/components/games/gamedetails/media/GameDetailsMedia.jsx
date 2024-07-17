import propTypes from "prop-types";
import { Button } from "../../../ui/index.js";
import { Link, useNavigate } from "react-router-dom";
import { useCheckGameInCollection } from "../../../../hooks/useCheckGameInCollection.js";
import { CardBackground } from "../../../ui/cardBackground/CardBackground.jsx";
import { useAuth } from "../../../../context/AuthContext.jsx";
import { retrieveGameSummary } from "../../../../utils/gameDetailsUtils.js";
import { CardImage } from "../../../ui/card/image/CardImage.tsx";
import { MediaList } from "./list/MediaList.tsx";
import { Tooltip } from "../../../ui/tooltip/Tooltip.tsx";
import { getPlatformsIcons } from "../../../../utils/getPlatformsIcons.js";
import { getGenreIcons } from "../../../../utils/getGenreIcons.js";
import { getGameModesIcon } from "../../../../utils/getIcons.ts";
import clsx from "clsx";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import "./GameDetailsMedia.css";

export const GameDetailsMedia = ({ data, gameSlug }) => {
  const { isAuth } = useAuth();
  const { gameInCollection, isLoading } = useCheckGameInCollection(gameSlug);

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
        src: data?.videos?.length
          ? data?.videos[0].video_id
          : "https://www.youtube.com/watch?v=0",
        provider: "youtube",
      },
    ],
  };

  return (
    <div className="mx-auto grid grid-cols-4 gap-4">
      <div className="col-span-4 flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-y-1">
          <CardImage
            src={largeCoverUrl}
            alt={`Cover de ${data?.name}`}
            className="h-56 w-40 sm:h-72 sm:w-60 lg:h-80 lg:w-64 2xl:h-96 2xl:w-72"
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
                "w-40 text-xs font-semibold transition-all duration-300 ease-in-out disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-50 sm:w-56 sm:text-base lg:w-64 2xl:w-72",
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
              Modos de juego
            </h3>
            <ul className="flex flex-wrap justify-center gap-4">
              {data?.game_modes ? (
                data.game_modes.map((mode) => (
                  <Link key={mode.id} to={mode?.url} target="_blank">
                    <Tooltip text={getGameModesIcon(mode.id).name}>
                      <MediaList
                        key={mode.id}
                        id={mode.id}
                        icon={getGameModesIcon(mode.id).icon}
                      />
                    </Tooltip>
                  </Link>
                ))
              ) : (
                <p className="text-pretty text-xs text-gray-400 md:text-base">
                  No hay modos de juego disponibles
                </p>
              )}
            </ul>
          </div>
          <div className="divider my-1"></div>
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
                      icon={getPlatformsIcons(platform.id).icon}
                    />
                  </Tooltip>
                ))
              ) : (
                <p className="text-pretty text-gray-400">
                  No hay plataformas disponibles
                </p>
              )}
            </ul>
          </div>
          <div className="divider my-1"></div>
          <div className="flex-grow justify-center space-y-2 rounded-md">
            <h3 className="text-center text-base tracking-wider text-blue-300 sm:text-sm md:text-lg">
              GÉNEROS
            </h3>
            <ul className="flex flex-wrap justify-center gap-4">
              {data?.genres ? (
                data.genres.map((genre) => (
                  <Tooltip key={genre.id} text={getGenreIcons(genre.id).name}>
                    <MediaList
                      id={genre.id}
                      name={genre.name}
                      icon={getGenreIcons(genre.id).icon}
                    />
                  </Tooltip>
                ))
              ) : (
                <p className="text-pretty text-gray-400">
                  No hay plataformas disponibles
                </p>
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
