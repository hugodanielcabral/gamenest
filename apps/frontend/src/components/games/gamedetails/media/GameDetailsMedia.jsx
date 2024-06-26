import propTypes from "prop-types";
import ReactPlayer from "react-player";
import { Button } from "../../../ui/index.js";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useCheckGameInCollection } from "../../../../hooks/useCheckGameInCollection.js";
import { CardBackground } from "../../../ui/cardBackground/CardBackground.jsx";
import { useAuth } from "../../../../context/AuthContext.jsx";
import { retrieveGameSummary } from "../../../../utils/gameDetailsUtils.js";
import { tabsGameDetailsMediaData } from "../../../../constants/gamedetails/websiteicons.js";

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
    ? "Ya en la colección"
    : "Agregar a la colección";

  return (
    <div className="grid grid-cols-4 gap-4 items-stretch">
      <div className="col-span-4 sm:col-span-1 md:col-span-1 flex flex-col gap-3">
        <img
          className="flex-grow"
          src={largeCoverUrl}
          alt={`Cover de ${data?.name}`}
        />
        {isAuth ? (
          <Button
            className={clsx(
              "font-semibold text-sm sm:text-sm md:text-lg transition-all duration-300 ease-in-out disabled:opacity-50 disabled:bg-gray-500 disabled:cursor-not-allowed",
              gameInCollection
                ? "bg-success hover:bg-success hover:bg-opacity-70 text-white"
                : "bg-info hover:bg-info hover:bg-opacity-70 text-white"
            )}
            disabled={isLoading}
            onClick={() => navigate(navigateTo)}
          >
            {isLoading ? "Cargando..." : gameCollectionButtonLabel}
          </Button>
        ) : (
          <Button
            className="bg-warning hover:bg-warning hover:bg-opacity-90 text-zinc-600 text-sm sm:text-sm md:text-lg font-semibold transition-all duration-300 ease-in-out"
            onClick={() => navigate("/login")}
          >
            Agrega a tu colección (Inicia sesión)
          </Button>
        )}
      </div>
      <div className="col-span-4 sm:col-span-3 md:col-span-3 flex flex-col gap-3">
        {data?.videos ? (
          <div className="flex-grow min-h-[200px] max-h-[600px]">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${data.videos[0].video_id}`}
              light={true}
              width="100%"
              height="100%"
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
      </div>
      <div className="col-span-4 my-2">
        <CardBackground className="overflow-auto max-h-44 rounded-md">
          <h3 className="text-center text-lg md:text-xl font-semibold text-error">
            Resumen
          </h3>

          {(
            <p className="text-base sm:text-xl md:text-2xl text-white">
              {retrieveGameSummary(steam_short_description, igdb_summary)}
            </p>
          ) ?? <p className="text-center mt-2">No hay resumen disponible.</p>}
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
              className={`tab flex-grow ${
                tab.id === activeTab
                  ? "tab-active text-white font-bold"
                  : "text-gray-400"
              } transition-all duration-300 ease-in-out hover:text-white hover:text-opacity-70`}
            >
              <img
                src={tab.icon}
                alt={`${tab.name} tab`}
                className={tab.iconClassName}
              />
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
