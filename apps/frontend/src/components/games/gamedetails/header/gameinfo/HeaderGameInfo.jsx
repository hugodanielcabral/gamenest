import propTypes from "prop-types";
import { useState } from "react";
export const HeaderGameInfo = ({ game }) => {
  const { name, summary, first_release_date, involved_companies } = game;
  const unixTimestamp = first_release_date;
  const date = new Date(unixTimestamp * 1000);
  const year = date.getFullYear();
  const [lineClamp, setLineClamp] = useState(true);

  const handleLineClamp = () => {
    setLineClamp(!lineClamp);
  };

  const involvedCompanies = involved_companies
    ? involved_companies.find((company) => company.developer === true)
    : null;

  return (
    <div className="col-span-5 md:col-span-3 *:m-5 ">
      <h1 className="text-3xl font-bold">
        {name} ({year})
      </h1>
      <h2 className="text-2xl prose">
        {involvedCompanies && involvedCompanies.company.name}
      </h2>
      <div>
        <p
          className={`text-lg max-w-[80ch] ${lineClamp ? "line-clamp-3" : ""}`}
        >
          {summary}
        </p>
        <button
          className={`text-lg font-bold text-accent ${
            lineClamp ? "" : "hidden"
          }`}
          onClick={handleLineClamp}
        >
          Read more...
        </button>
      </div>
      <div className="flex gap-x-1">
        <p className="text-base font-bold">Platforms:</p>
        <ul className="flex gap-x-2">
          {game.platforms.map((platform) => (
            <li key={platform.id} className="text-base">
              {platform.abbreviation}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul className="flex gap-x-2 *:bg-info *:text-stone-950 *:rounded-md *:p-2 *:font-bold">
          {game.genres.map((genre) => (
            <li key={genre.id} className="text-base">
              {genre.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

HeaderGameInfo.propTypes = {
  game: propTypes.object.isRequired,
};
