import propTypes from "prop-types";
import { gamesGenres } from "../../../../../data/gamesGenres.js";
import { useEffect, useState } from "react";

export const GamesFiltersGenres = ({ handleGenreChange, filtersReset }) => {
  const [showMoreGenres, SetShowMoreGenres] = useState(false);
  const [hidden, setHidden] = useState("hidden");
  const [checkboxesChecked, setCheckboxesChecked] = useState(
    Array(gamesGenres.length).fill(false)
  );

  const handleShowMoreGenres = () => {
    SetShowMoreGenres(!showMoreGenres);
    setHidden(showMoreGenres ? "hidden" : "");
  };

  useEffect(() => {
    if (filtersReset) {
      setCheckboxesChecked(Array(gamesGenres.length).fill(false));
    }
  }, [filtersReset]);

  const handleCheckboxChange = (e, index) => {
    handleGenreChange(e);
    const newCheckboxesChecked = [...checkboxesChecked];
    newCheckboxesChecked[index] = e.target.checked;
    setCheckboxesChecked(newCheckboxesChecked);
  };

  return (
    <div className="rounded-none collapse bg-base-200">
      <input type="checkbox" className="peer" />
      <div className="text-lg font-bold bg-transparent collapse-title">
        Genres
      </div>
      <div className="rounded-lg bg-base-100 collapse-content text-primary-content">
        <div className={`form-control`}>
          {gamesGenres.map((genre, index) => (
            <label
              key={genre.id}
              className={`cursor-pointer label ${index > 5 && hidden}`}
            >
              <span className="label-text">{genre.name}</span>
              <input
                type="checkbox"
                className="checkbox"
                value={genre.id}
                onChange={(e) => handleCheckboxChange(e, index)}
                checked={checkboxesChecked[index]}
              />
            </label>
          ))}
        </div>
        <button className="text-primary" onClick={handleShowMoreGenres}>
          {showMoreGenres ? "Show less..." : "Show more..."}
        </button>
      </div>
    </div>
  );
};

GamesFiltersGenres.propTypes = {
  handleGenreChange: propTypes.func.isRequired,
  filtersReset: propTypes.bool.isRequired,
};
