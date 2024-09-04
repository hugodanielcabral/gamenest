import propTypes from "prop-types";
import { Button } from "../../../ui/button/Button.tsx";
import { useNavigate } from "react-router-dom";
import { useCheckGameInCollection } from "../../../../hooks/useCheckGameInCollection.js";
import { CardBackground } from "../../../ui/cardBackground/CardBackground.jsx";
import { useAuth } from "../../../../context/AuthContext.jsx";
/* import { retrieveGameSummary } from "../../../../utils/gameDetailsUtils.js";
 */ import { CardImage } from "../../../ui/card/image/CardImage.tsx";
import { MediaList } from "./list/MediaList.tsx";
import { Tooltip } from "../../../ui/tooltip/Tooltip.tsx";
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

  /*   const steam_short_description = data?.steamData?.short_description;
   */ const igdb_summary = data?.summary;

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
      <div className="col-span-4 flex flex-col gap-4 lg:flex-row">
        <div className="flex flex-col items-center gap-y-1">
          <CardImage
            src={largeCoverUrl}
            alt={`Cover de ${data?.name}`}
            className="h-56 w-40 sm:h-64 sm:w-52 md:h-72 md:w-56 lg:h-80 lg:w-64 2xl:h-96 2xl:w-72"
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
                "w-40 text-xs font-semibold transition-all duration-300 ease-in-out disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-50 sm:w-52 sm:text-base md:w-56 lg:w-64 2xl:w-72",
              )}
              disabled={isLoading}
              onClick={() => navigate(navigateTo)}
            >
              {isLoading ? "Cargando..." : gameCollectionButtonLabel}
            </Button>
          )}
        </div>
        <Plyr source={videoSrc} />
        <div className="flex flex-shrink-0 flex-row gap-x-4 rounded-md border-2 border-gray-700 bg-base-100 bg-opacity-70 p-4 lg:flex-1 lg:flex-col">
          <div className="flex-grow justify-center space-y-4 rounded-md">
            <h3 className="text-center text-xs uppercase tracking-wider text-blue-400 sm:text-sm md:text-base lg:text-lg xl:text-xl">
              GÉNEROS
            </h3>
            <ul className="flex flex-grow flex-wrap justify-center gap-4">
              {data?.genres ? (
                data.genres.map((genre) => (
                  <Tooltip key={genre.id} text={getGenreIcons(genre.id).name}>
                    <MediaList
                      id={genre.id}
                      name={genre.name}
                      icon={getGenreIcons(genre.id).icon}
                      className="size-4 sm:size-6 md:size-7 xl:size-9"
                    />
                  </Tooltip>
                ))
              ) : (
                <p className="text-pretty text-center text-xs text-gray-400 md:text-base">
                  No hay plataformas disponibles
                </p>
              )}
            </ul>
          </div>
          <div className="divider my-1"></div>
          <div className="flex-grow justify-center space-y-4 rounded-md">
            <h3 className="text-center text-xs uppercase tracking-wider text-blue-400 sm:text-sm md:text-base lg:text-lg xl:text-xl">
              Modos de juego
            </h3>
            <ul className="flex flex-wrap justify-center gap-4">
              {data?.game_modes ? (
                data.game_modes.map((mode) => (
                  <Tooltip key={mode.id} text={getGameModesIcon(mode.id).name}>
                    <MediaList
                      key={mode.id}
                      id={mode.id}
                      icon={getGameModesIcon(mode.id).icon}
                      className="size-4 sm:size-6 md:size-7 xl:size-9"
                    />
                  </Tooltip>
                ))
              ) : (
                <p className="text-pretty text-center text-xs text-gray-400 md:text-base">
                  No hay modos de juego disponibles
                </p>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="col-span-4 my-2">
        <CardBackground className="max-h-60 space-y-2 overflow-auto rounded-md border-2 border-gray-700 bg-base-100 bg-opacity-70 p-4 shadow-transparent">
          <h3 className="text-center text-base uppercase tracking-wider text-blue-400 sm:text-lg md:text-xl">
            Resumen
          </h3>

          {(
            <p className="text-sm text-white sm:text-lg md:text-xl">
              {/* {steam_short_description
                ? retrieveGameSummary(steam_short_description, igdb_summary)
                : igdb_summary} */}
              {igdb_summary}
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
