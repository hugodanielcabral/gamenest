import propTypes from "prop-types";
import { gamesGenres } from "../../../../../data/gamesGenres.js";
import { useState } from "react";

export const GamesFiltersGenres = ({ handleGenreChange }) => {
  const [showMoreGenres, SetShowMoreGenres] = useState(false);
  const [hidden, setHidden] = useState("hidden");

  const handleShowMoreGenres = () => {
    SetShowMoreGenres(!showMoreGenres);
    setHidden(showMoreGenres ? "hidden" : "");
  };
  console.log(showMoreGenres);

  return (
    <div className="rounded-none collapse bg-base-200">
      <input type="checkbox" className="peer" />
      <div className="text-base font-bold bg-transparent collapse-title">
        Genres
      </div>
      <div className="bg-transparent collapse-content text-primary-content">
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
                onChange={handleGenreChange}
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
};
