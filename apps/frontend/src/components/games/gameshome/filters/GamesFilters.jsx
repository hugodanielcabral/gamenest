import { useEffect, useState } from "react";
import { useGames } from "../../../../context/GamesContext";
import { useNavigate } from "react-router-dom";
import { GamesFiltersPlatforms } from "./platforms/GamesFiltersPlatforms";
import { GamesFiltersGenres } from "./genres/GamesFiltersGenres";

export const GamesFilters = () => {
  const [platformValues, setPlatformValues] = useState([]);
  const [genresValues, setGenresValues] = useState([]);
  const [filtersReset, setFiltersReset] = useState(false);

  const { params } = useGames();
  const navigate = useNavigate();

  const handlePlatformChange = (e) => {
    let newPlatformValues;
    if (e.target.checked) {
      newPlatformValues = [...platformValues, e.target.value];
    } else {
      newPlatformValues = platformValues.filter(
        (value) => value !== e.target.value
      );
    }
    setPlatformValues(newPlatformValues);

    if (newPlatformValues.length === 0) {
      params.searchParams.delete("platforms");
      navigate(`/games${params.search}`);
      return;
    }

    params.searchParams.set("platforms", newPlatformValues.toString());
    navigate(`/games${params.search}`);
  };

  const handleGenreChange = (e) => {
    let newGenresValues;
    if (e.target.checked) {
      newGenresValues = [...genresValues, e.target.value];
    } else {
      newGenresValues = genresValues.filter(
        (value) => value !== e.target.value
      );
    }
    setGenresValues(newGenresValues);

    if (newGenresValues.length === 0) {
      params.searchParams.delete("genres");
      navigate(`/games${params.search}`);
      return;
    }

    params.searchParams.set("genres", newGenresValues.toString());
    navigate(`/games${params.search}`);
  };

  const handleResetFilters = () => {
    setPlatformValues([]);
    setGenresValues([]);
    params.searchParams.delete("platforms");
    params.searchParams.delete("genres");
    navigate(`/games${params.search}`);
    setFiltersReset(true);
  };

  useEffect(() => {
    if (filtersReset) {
      setFiltersReset(false);
    }
  }, [filtersReset]);

  return (
    <>
      <div className="flex items-center justify-evenly bg-base-200">
        <h2 className="p-3 text-2xl font-bold text-center text-primary">
          Filters
        </h2>
        <button
          className="w-16 h-10 font-bold rounded-md bg-secondary hover:bg-secondary/75 text-primary-content"
          onClick={handleResetFilters}
        >
          Clear all
        </button>
      </div>
      <GamesFiltersPlatforms
        handlePlatformChange={handlePlatformChange}
        filtersReset={filtersReset}
      />
      <GamesFiltersGenres
        handleGenreChange={handleGenreChange}
        filtersReset={filtersReset}
      />
    </>
  );
};
