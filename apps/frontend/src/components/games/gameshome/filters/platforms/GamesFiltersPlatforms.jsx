import propTypes from "prop-types";
import { gamesPlatforms } from "../../../../../data/gamesPlatforms.js";

export const GamesFiltersPlatforms = ({ handlePlatformChange }) => {
  return (
    <div className="rounded-none collapse bg-base-200">
      <input type="checkbox" className="peer" />
      <div className="text-base font-bold bg-transparent collapse-title">
        Platforms
      </div>
      <div className="bg-transparent collapse-content text-primary-content">
        <div className="form-control">
          {gamesPlatforms.map((platform) => (
            <label key={platform.id} className="cursor-pointer label">
              <span className="label-text">{platform.name}</span>
              <input
                type="checkbox"
                className="checkbox"
                value={platform.id}
                onChange={handlePlatformChange}
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
};
