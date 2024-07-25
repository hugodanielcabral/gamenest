import propTypes from "prop-types";
import { CardCover } from "./index.js";
import { Link } from "react-router-dom";
import clsx from "clsx";

export const ListCard = ({ gameData }) => {
  const GAME_PATH = `/collection/${gameData.game_slug}`;
  return (
    <Link
      to={GAME_PATH}
      className="group relative block h-80 w-56 rounded-md bg-black shadow-md shadow-black sm:h-72 sm:w-48 md:h-80 md:w-56 lg:h-96 lg:w-72"
    >
      <CardCover gameData={gameData} />
      {/* <CardActions gameData={gameData} /> */}
      <div className="relative space-y-2 p-4 sm:space-y-3 sm:p-6 md:space-y-4 lg:p-8">
        <div className="md:mt-42 mt-6">
          <div className="translate-y-8 transform transition-all duration-200 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 md:opacity-0">
            <h1 className="mb-2 text-pretty text-center text-xs font-medium uppercase tracking-widest text-gray-300 md:text-sm">
              Calificación:{" "}
              <span
                className={clsx(
                  {
                    "text-gray-300": gameData?.rating === 0,
                    "text-red-500":
                      gameData?.rating > 0 && gameData?.rating < 3,
                    "text-green-500":
                      gameData?.rating === 3 || gameData?.rating === 4,
                    "text-yellow-500": gameData?.rating === 5,
                  },
                  "font-bold",
                )}
              >
                {gameData?.rating} / 5
              </span>
            </h1>
            <p className="text-pretty text-center text-sm font-bold text-white sm:text-base md:text-lg">
              {gameData?.game_name}
            </p>
            <div className="flex flex-col items-center gap-x-4 gap-y-1">
              <div className="text-xs font-medium uppercase tracking-widest text-info md:text-sm">
                {gameData?.status_name}
              </div>
              <div className="text-xs font-medium uppercase tracking-widest text-pink-500 md:text-sm">
                {gameData.total_played ?? 0} hs jugadas
              </div>
            </div>
            <p className="mt-5 h-fit text-center text-xs italic text-white md:text-sm">
              {gameData?.progress_note
                ? gameData?.progress_note
                : "Sin notas de progreso"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

ListCard.propTypes = {
  gameData: propTypes.object.isRequired,
};

ListCard.defaultProps = {
  gameData: {},
};
