import propTypes from "prop-types";
import { CardBackground } from "../../../../../ui/index.js";

import { getFormattedRatings } from "../../../../../../utils/gameDetailsUtils.js";
import { AgeRatingImage } from "./image/AgeRatingImage.jsx";

export const AdditionalInfoAgeRating = ({ data }) => {
  const ageRatings = data?.age_ratings;

  const { formattedEsrbRating, formattedPegiRating } =
    getFormattedRatings(ageRatings);

  return (
    <CardBackground className="flex flex-col gap-y-2 rounded-md border-2 border-gray-700 bg-base-100 bg-opacity-70 shadow-transparent">
      <h3 className="text-center text-xs uppercase tracking-wider text-blue-400 sm:text-sm md:text-base lg:text-lg xl:text-xl">
        Clasificación por edades
      </h3>
      {!ageRatings ? (
        <p className="text-center text-xs uppercase tracking-wider text-gray-400 sm:text-sm md:text-base lg:text-lg xl:text-xl">
          No hay clasificación por edades disponible
        </p>
      ) : (
        <div className="flex flex-wrap justify-center gap-4">
          {formattedEsrbRating && (
            <AgeRatingImage src={formattedEsrbRating.image} alt="ESRB Rating" />
          )}
          {formattedPegiRating && (
            <AgeRatingImage src={formattedPegiRating.image} alt="PEGI Rating" />
          )}
        </div>
      )}
    </CardBackground>
  );
};

AdditionalInfoAgeRating.propTypes = {
  data: propTypes.object.isRequired,
};
