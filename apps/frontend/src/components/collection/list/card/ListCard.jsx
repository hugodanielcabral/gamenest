import propTypes from "prop-types";
import { CardCover } from "./index.js";
import { Link } from "react-router-dom";
import clsx from "clsx";

export const ListCard = ({ gameData }) => {
  const GAME_PATH = `/collection/${gameData.game_slug}`;
  return (
    <div className="relative col-span-2 flex md:col-span-1">
      <Link
        to={GAME_PATH}
        className="group relative block h-64 w-44 rounded-md bg-black shadow-md shadow-black sm:h-72 sm:w-48 md:h-80 md:w-56 lg:h-96 lg:w-72"
      >
        <CardCover gameData={gameData} />
        {/* <CardActions gameData={gameData} /> */}
        <div className="relative space-y-2 p-4 sm:space-y-3 sm:p-6 md:space-y-4 lg:p-8">
          <h1 className="mb-2 text-pretty text-xs font-medium uppercase tracking-widest text-gray-300 md:text-center md:text-sm">
            Calificación:{" "}
            <span
              className={clsx(
                {
                  "text-gray-300": gameData?.rating === 0,
                  "text-red-500": gameData?.rating > 0 && gameData?.rating < 3,
                  "text-green-500":
                    gameData?.rating === 3 && gameData?.rating === 4,
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
              {gameData.total_played} hs jugadas
            </div>
          </div>

          <div className="md:mt-42 mt-6">
            <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
              <p className="h-fit text-xs text-white md:text-sm">
                {gameData?.progress_notes || "Sin notas de progreso"}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

ListCard.propTypes = {
  gameData: propTypes.object.isRequired,
};

ListCard.defaultProps = {
  gameData: {},
};
