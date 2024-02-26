import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { gamesGenres } from "../../../../../data/gamesGenres.js";

export const GamesFiltersGenres = () => {
  const [showMoreGenres, SetShowMoreGenres] = useState(false);
  const [hidden, setHidden] = useState("hidden");
  const [searchParams, setSearchParams] = useSearchParams();
  const [genres, setGenres] = useState([]);

  const handleShowMoreGenres = () => {
    SetShowMoreGenres(!showMoreGenres);
    setHidden(showMoreGenres ? "hidden" : "");
  };

  const onCheckboxChange = (e) => {
    const newGenres = [...genres];
    if (e.target.checked) {
      newGenres.push(e.target.value);
    } else {
      const index = newGenres.indexOf(e.target.value);
      if (index > -1) {
        newGenres.splice(index, 1);
      }
    }
    setGenres(newGenres);

    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (newGenres.length > 0) {
      newSearchParams.set("genres", newGenres.join(","));
    } else {
      newSearchParams.delete("genres");
    }
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    const genresParam = searchParams.get("genres");
    if (genresParam) {
      setGenres(genresParam.split(","));
    }
  }, [searchParams]);

  return (
    <div className="rounded-none collapse bg-base-200">
      <input type="checkbox" className="peer" />
      <div className="text-lg font-bold bg-transparent collapse-title">
        Genres
      </div>
      <div className="rounded-lg bg-base-300 collapse-content text-primary-content">
        <div className={`form-control`}>
          {gamesGenres.map((genre, index) => (
            <label
              key={genre.id}
              className={`cursor-pointer label ${index > 5 && hidden}`}
            >
              <span className="label-text">{genre.name}</span>
              <input
                type="checkbox"
                name={genre.name}
                id={genre.id}
                value={genre.id}
                onChange={onCheckboxChange}
                checked={genres.includes(genre.id.toString())}
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
