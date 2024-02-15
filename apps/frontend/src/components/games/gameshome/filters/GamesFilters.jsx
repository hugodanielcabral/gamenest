import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GamesFiltersPlatforms } from "./platforms/GamesFiltersPlatforms";
import { GamesFiltersGenres } from "./genres/GamesFiltersGenres";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilterCircleXmark } from "@fortawesome/free-solid-svg-icons";

export const GamesFilters = () => {
  const [filtersReset, setFiltersReset] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-evenly bg-base-200">
        <h2 className="p-3 text-2xl font-bold text-center">Filters</h2>
        <button
          className="px-3 py-2 font-bold rounded-xl btn-ghost"
          /*    onClick={handleResetFilters} */
        >
          <FontAwesomeIcon
            icon={faFilterCircleXmark}
            size="2xl"
            style={{ color: "#f13304" }}
          />
        </button>
      </div>
      {/* <GamesFiltersPlatforms
        handlePlatformChange={handlePlatformChange}
        filtersReset={filtersReset}
      /> */}
      {/* <GamesFiltersGenres
        handleGenreChange={handleGenreChange}
        filtersReset={filtersReset}
      /> */}
    </>
  );
};
