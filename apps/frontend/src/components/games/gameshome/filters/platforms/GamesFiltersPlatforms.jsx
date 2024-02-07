import propTypes from "prop-types";
import { gamesPlatforms } from "../../../../../data/gamesPlatforms.js";
import { useEffect, useState } from "react";

export const GamesFiltersPlatforms = ({
  handlePlatformChange,
  filtersReset,
}) => {
  const [checkboxesChecked, setCheckboxesChecked] = useState(
    Array(gamesPlatforms.length).fill(false)
  );

  useEffect(() => {
    if (filtersReset) {
      setCheckboxesChecked(Array(gamesPlatforms.length).fill(false));
    }
  }, [filtersReset]);

  const handleCheckboxChange = (e, index) => {
    handlePlatformChange(e);
    const newCheckboxesChecked = [...checkboxesChecked];
    newCheckboxesChecked[index] = e.target.checked;
    setCheckboxesChecked(newCheckboxesChecked);
  };
  return (
    <div className="rounded-none collapse bg-base-200">
      <input type="checkbox" className="peer" />
      <div className="text-lg font-bold bg-transparent collapse-title">
        Platforms
      </div>
      <div className="rounded-lg bg-base-100 collapse-content text-primary-content">
        <div className="form-control">
          {gamesPlatforms.map((platform, index) => (
            <label key={platform.id} className="cursor-pointer label">
              <span className="label-text">{platform.name}</span>
              <input
                type="checkbox"
                className="checkbox"
                value={platform.id}
                onChange={(e) => handleCheckboxChange(e, index)}
                checked={checkboxesChecked[index]}
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

GamesFiltersPlatforms.propTypes = {
  handlePlatformChange: propTypes.func.isRequired,
  filtersReset: propTypes.bool.isRequired,
};
