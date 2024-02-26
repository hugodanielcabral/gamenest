import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { gamesPlatforms } from "../../../../../data/gamesPlatforms.js";

export const GamesFiltersPlatforms = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [platforms, setPlatforms] = useState([]);

  const onCheckboxChange = (e) => {
    const newPlatforms = [...platforms];
    if (e.target.checked) {
      newPlatforms.push(e.target.value);
    } else {
      const index = newPlatforms.indexOf(e.target.value);
      if (index > -1) {
        newPlatforms.splice(index, 1);
      }
    }
    setPlatforms(newPlatforms);

    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (newPlatforms.length > 0) {
      newSearchParams.set("platforms", newPlatforms.join(","));
    } else {
      newSearchParams.delete("platforms");
    }
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    const platformsParam = searchParams.get("platforms");
    if (platformsParam) {
      setPlatforms(platformsParam.split(","));
    }
  }, []);
  return (
    <>
      <div className="rounded-none collapse bg-base-200">
        <input type="checkbox" className="peer" />
        <div className="text-lg font-bold bg-transparent collapse-title">
          Platforms
        </div>
        <div className="rounded-lg bg-base-300 collapse-content text-primary-content">
          <div className={`form-control`}>
            {gamesPlatforms.map((platform) => (
              <label key={platform.id} className={`cursor-pointer label`}>
                <span className="label-text">{platform.name}</span>
                <input
                  type="checkbox"
                  name={platform.name}
                  id={platform.id}
                  value={platform.id}
                  onChange={onCheckboxChange}
                  checked={platforms.includes(platform.id.toString())}
                />
              </label>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
