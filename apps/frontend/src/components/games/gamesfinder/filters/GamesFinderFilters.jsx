import propTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSearchParameters } from "../../../../hooks/useSearchParameters";
import { gamesPlatforms } from "../../../../data/gamesPlatforms.js";
import { gamesGenres } from "../../../../data/gamesGenres.js";
import clsx from "clsx";

export const GamesFinderFilters = ({
  setActiveFiltersCount,
  checkedFilters,
  setCheckedFilters,
  showMoreGenres,
  setShowMoreGenres,
  handleOnClearFilters,
  activeFiltersCount,
}) => {
  const { searchParams, setParams } = useSearchParameters({
    platforms: "",
    genres: "",
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

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
          (platform) => platform !== valueId,
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

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <div className="drawer z-10">
      <input
        id="filters-drawer"
        type="checkbox"
        className="drawer-toggle"
        onChange={() => setDrawerOpen(!drawerOpen)}
      />
      <div className="drawer-content">
        <label
          htmlFor="filters-drawer"
          className="btn drawer-button btn-wide bg-blue-600 text-white hover:bg-blue-600 hover:bg-opacity-70"
        >
          Filtros {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        </label>
      </div>
      <div className="drawer-side overflow-auto">
        <label
          htmlFor="filters-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu mt-28 min-h-full w-80 bg-base-200 p-4 text-base-content">
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
              "mt-2 w-full rounded-md bg-error p-2 text-white transition-all duration-200 ease-in-out hover:bg-opacity-70",
            )}
            onClick={handleOnClearFilters}
          >
            Limpiar filtros
          </button>
          <div>
            <h2 className="divider text-center text-2xl text-white">
              Plataformas
            </h2>
            {gamesPlatforms.map((platform) => (
              <div className="form-control" key={platform.id}>
                <label className="label cursor-pointer">
                  <span className="label-text">{platform.name}</span>
                  <input
                    type="checkbox"
                    className="checkbox-error checkbox"
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
          </div>
          <div>
            <h2 className="divider text-center text-2xl text-white">Generos</h2>
            {gamesGenres.map((genre, index) => (
              <div
                className={`form-control ${index > 5 && showMoreGenres}`}
                key={genre.id}
              >
                <label className="label cursor-pointer">
                  <span className="label-text">{genre.name}</span>
                  <input
                    type="checkbox"
                    className={`checkbox-error checkbox`}
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
              className="btn btn-outline btn-info btn-sm mt-2"
              onClick={() => {
                setShowMoreGenres(
                  showMoreGenres === "hidden" ? "block" : "hidden",
                );
              }}
            >
              {showMoreGenres === "hidden" ? "Mostrar más" : "Mostrar menos"}
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

GamesFinderFilters.propTypes = {
  setActiveFiltersCount: propTypes.func,
  checkedFilters: propTypes.object,
  setCheckedFilters: propTypes.func,
  showMoreGenres: propTypes.string,
  setShowMoreGenres: propTypes.func,
  handleOnClearFilters: propTypes.func,
  activeFiltersCount: propTypes.number,
};
