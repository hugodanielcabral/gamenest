import { useState, useEffect } from "react";
import { useSearchParameters } from "../../../../hooks/useSearchParameters";
import { gamesPlatforms } from "../../../../data/gamesPlatforms.js";
import { gamesGenres } from "../../../../data/gamesGenres.js";
import { CardBackground } from "../../../ui/cardBackground/CardBackground";
import clsx from "clsx";

export const GamesFinderFilters = () => {
  const { searchParams, setParams } = useSearchParameters({
    platforms: "",
    genres: "",
  });

  const [showMoreGenres, setShowMoreGenres] = useState("hidden");

  //TODO 6: Se debe mostrar un mensaje en caso de que no se encuentren juegos con los filtros seleccionados.

  const [checkedFilters, setCheckedFilters] = useState({
    platforms: [],
    genres: [],
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

  const cleanFilters = () => {
    setCheckedFilters({
      platforms: [],
      genres: [],
    });
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

  return (
    <CardBackground>
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
          "btn btn-error btn-outline btn-sm mt-2 self-auto w-full my-5"
        )}
        onClick={cleanFilters}
      >
        Clear filters
      </button>
      <h2 className="text-xl font-semibold">Platforms</h2>
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
      <div className="divider divider-start divider-info"></div>
      <div className="max-h-96 overflow-auto">
        <h2 className="text-xl font-semibold">Genres</h2>
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
