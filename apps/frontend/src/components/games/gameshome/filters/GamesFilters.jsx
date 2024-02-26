import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilterCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { GamesFiltersPlatforms } from "./platforms/GamesFiltersPlatforms.jsx";

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
        <h3 className="p-3 font-bold text-1xl">Platforms</h3>
        <GamesFiltersPlatforms />
      </div>
    </div>
  );
};
