import propTypes from "prop-types";
import { CardBackground } from "../../../../../ui/index.js";
import { retrieveGameStoryline } from "../../../../../../utils/gameDetailsUtils.js";

export const AdditionalInfoStoryline = ({ data }) => {
  const steam_detailed_description = data?.steamData?.detailed_description;
  const igdb_storyline = data?.storyline;

  return (
    <CardBackground className="col-span-3 max-h-60 md:max-h-96 overflow-auto">
      <h2 className="text-center text-xl md:text-2xl mb-2 text-error">
        Historia
      </h2>

      {(
        <p className="text-lg text-balance md:text-xl text-white">
          {retrieveGameStoryline(steam_detailed_description, igdb_storyline)}
        </p>
      ) ?? <p className="mt-2">Historia no disponible.</p>}
    </CardBackground>
  );
};

AdditionalInfoStoryline.propTypes = {
  data: propTypes.object.isRequired,
};
