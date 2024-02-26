import { GamesFiltersPlatforms } from "./platforms/GamesFiltersPlatforms.jsx";
import { GamesFiltersGenres } from "./genres/GamesFiltersGenres.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilterCircleXmark } from "@fortawesome/free-solid-svg-icons";

export const GamesFilters = () => {
  return (
    <div className="flex flex-col justify-evenly bg-base-200">
      <div className="flex items-center justify-evenly bg-base-300">
        <h2 className="p-3 text-2xl font-bold text-center">Filters</h2>
        <button className="px-3 py-2 font-bold rounded-xl">
          <FontAwesomeIcon
            icon={faFilterCircleXmark}
            size="2xl"
            style={{ color: "#f13304" }}
          />
        </button>
      </div>
      <div className="flex flex-col justify-evenly bg-base-200">
        <GamesFiltersPlatforms />
        <GamesFiltersGenres />
      </div>
    </div>
  );
};
