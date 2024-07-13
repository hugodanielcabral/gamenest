import { GamesFinderCard } from "./card/GamesFinderCard";
import { GamesFinderSearch } from "./search/GamesFinderSearch.jsx";
import { NoData } from "../../notfound/NoData.jsx";
import { GamesFinderPagination } from "./pagination/GamesFinderPagination.jsx";
import { GamesFinderFilters } from "./filters/GamesFinderFilters.jsx";
import { useState } from "react";
import { GamesFinderSkeleton } from "./skeleton/GamesFinderSkeleton.jsx";
import { useFetch } from "../../../hooks/useFetch.ts";
import notFoundImg from "../../../assets/images/fortnite-confused.webp";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const GamesFinder = () => {
  const { games, currentPage, totalPages, isLoading, error } = useFetch(
    `${BASE_URL}/games`,
  );

  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [checkedFilters, setCheckedFilters] = useState({
    platforms: [],
    genres: [],
  });
  const [showMoreGenres, setShowMoreGenres] = useState("hidden");

  const handleOnClearFilters = () => {
    setCheckedFilters({
      platforms: [],
      genres: [],
    });
  };

  return (
    <div className="grid grid-cols-4">
      {isLoading ? (
        <GamesFinderSkeleton />
      ) : (
        <>
          <div className="col-span-4 md:col-span-4">
            <GamesFinderSearch handleOnClearFilters={handleOnClearFilters} />
          </div>
          <div className="col-span-4 mx-auto p-4 md:col-span-4">
            <GamesFinderFilters
              setActiveFiltersCount={setActiveFiltersCount}
              checkedFilters={checkedFilters}
              setCheckedFilters={setCheckedFilters}
              showMoreGenres={showMoreGenres}
              setShowMoreGenres={setShowMoreGenres}
              handleOnClearFilters={handleOnClearFilters}
              activeFiltersCount={activeFiltersCount}
            />
          </div>
          <div className="col-span-4 grid grid-cols-1 gap-4 rounded p-4 lg:grid-cols-2">
            {games?.length ? (
              games.map((game) => <GamesFinderCard game={game} key={game.id} />)
            ) : (
              <div className="col-span-4 mx-auto flex flex-col items-center sm:flex-row">
                <img
                  src={notFoundImg}
                  alt="No se encontraron juegos"
                  className="h-48"
                />
                <NoData
                  className="text-2xl text-red-500"
                  message={error?.statusText || "No se encontraron juegos"}
                />
              </div>
            )}
          </div>
          {totalPages > 1 && (
            <div className={`col-span-4 mx-auto p-4`}>
              <GamesFinderPagination
                totalPages={totalPages}
                currentPage={currentPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
