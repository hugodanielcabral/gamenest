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
      {gamesPlatforms.map((platform) => (
        <label key={platform.id}>
          <input
            type="checkbox"
            name={platform.name}
            id={platform.id}
            value={platform.id}
            onChange={onCheckboxChange}
            checked={platforms.includes(platform.id.toString())}
          />
          {platform.name}
        </label>
      ))}
    </>
  );
};
