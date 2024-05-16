import propTypes from "prop-types";
import { useEffect } from "react";
import { useSearchParameters } from "../../../../hooks/useSearchParameters";
import { gamesPlatforms } from "../../../../data/gamesPlatforms.js";
import { gamesGenres } from "../../../../data/gamesGenres.js";
import { CardBackground } from "../../../ui/cardBackground/CardBackground";
import clsx from "clsx";

export const GamesFinderFilters = ({
  setActiveFiltersCount,
  checkedFilters,
  setCheckedFilters,
  showMoreGenres,
  setShowMoreGenres,
  handleOnClearFilters,
}) => {
  const { searchParams, setParams } = useSearchParameters({
    platforms: "",
    genres: "",
  });

  //* Se obtienen los valores de los filtros de la URL y se guardan en un array para poder compararlos con los valores de los filtros seleccionados.
  const platformsArray = searchParams.get("platforms")?.split(", ");
  const genresArray = searchParams.get("genres")?.split(", ");

  const onCheckboxChange = (e) => {
    const { id, checked } = e.target;
    const filterType = e.target.dataset.filter;
    if (checked) {
      addToCheckedFilters(id, filterType);
    } else {
      removeFromCheckedFilters(id, filterType);
    }
  };

  const addToCheckedFilters = (valueId, filterType) => {
    if (filterType === "genre") {
      setCheckedFilters({
        ...checkedFilters,
        genres: [...checkedFilters.genres, valueId],
      });
    }

    if (filterType === "platform") {
      setCheckedFilters({
        ...checkedFilters,
        platforms: [...checkedFilters.platforms, valueId],
      });
    }
  };

  const removeFromCheckedFilters = (valueId, filterType) => {
    if (filterType === "genre") {
      setCheckedFilters({
        ...checkedFilters,
        genres: checkedFilters.genres.filter((genre) => genre !== valueId),
      });
    }

    if (filterType === "platform") {
      setCheckedFilters({
        ...checkedFilters,
        platforms: checkedFilters.platforms.filter(
          (platform) => platform !== valueId
        ),
      });
    }
  };

  useEffect(() => {
    //* Se actualizan los valores de los filtros en la URL.
    setParams({
      platforms:
        checkedFilters.platforms.length > 0
          ? checkedFilters.platforms.join(", ")
          : [],
      genres:
        checkedFilters.genres.length > 0
          ? checkedFilters.genres.join(", ")
          : [],
    });
  }, [checkedFilters]);

  useEffect(() => {
    //* Se obtienen los valores de los filtros de la URL y se guardan en un array para poder compararlos con los valores de los filtros seleccionados.
    const platforms = searchParams.get("platforms");
    const genres = searchParams.get("genres");

    if (platforms) {
      const platformsArray = platforms.split(", ");
      setCheckedFilters({
        ...checkedFilters,
        platforms: platformsArray,
      });
    }

    if (genres) {
      const genresArray = genres.split(", ");
      setCheckedFilters({
        ...checkedFilters,
        genres: genresArray,
      });
    }
  }, []);

  useEffect(() => {
    const totalActiveFilters =
      checkedFilters?.platforms?.length + checkedFilters?.genres?.length;
    setActiveFiltersCount(totalActiveFilters);
  }, [checkedFilters]);

  return (
    <CardBackground className="border-r-4 border-r-info">
      <button
        className={clsx(
          {
            hidden:
              checkedFilters.platforms.length === 0 &&
              checkedFilters.genres.length === 0,
            block:
              checkedFilters.platforms.length > 0 ||
              checkedFilters.genres.length > 0,
          },
          "w-full bg-error text-white p-2 rounded-md mt-2 hover:bg-opacity-70 transition-all duration-200 ease-in-out"
        )}
        onClick={handleOnClearFilters}
      >
        Clear filters
      </button>
      <h2 className="text-2xl text-white text-center divider">Platforms</h2>
      {gamesPlatforms.map((platform) => (
        <div className="form-control" key={platform.id}>
          <label className="cursor-pointer label">
            <span className="label-text">{platform.name}</span>
            <input
              type="checkbox"
              className="checkbox checkbox-error"
              name={platform.name}
              data-filter="platform"
              id={platform.id}
              onChange={onCheckboxChange}
              value={platform.id}
              checked={platformsArray?.includes(String(platform.id))}
            />
          </label>
        </div>
      ))}
      <div className="max-h-96 overflow-auto">
        <h2 className="text-2xl text-white text-center divider">Genres</h2>
        {gamesGenres.map((genre, index) => (
          <div
            className={`form-control ${index > 5 && showMoreGenres}`}
            key={genre.id}
          >
            <label className="cursor-pointer label">
              <span className="label-text">{genre.name}</span>
              <input
                type="checkbox"
                className={`checkbox checkbox-error`}
                name={genre.name}
                id={genre.id}
                data-filter="genre"
                onChange={onCheckboxChange}
                checked={genresArray?.includes(String(genre.id))}
              />
            </label>
          </div>
        ))}
        <button
          className="btn btn-info btn-outline btn-sm mt-2"
          onClick={() => {
            setShowMoreGenres(showMoreGenres === "hidden" ? "block" : "hidden");
          }}
        >
          {showMoreGenres === "hidden" ? "Show more" : "Show less"}
        </button>
      </div>
    </CardBackground>
  );
};

GamesFinderFilters.propTypes = {
  setActiveFiltersCount: propTypes.func,
  checkedFilters: propTypes.object,
  setCheckedFilters: propTypes.func,
  showMoreGenres: propTypes.string,
  setShowMoreGenres: propTypes.func,
  handleOnClearFilters: propTypes.func,
};
