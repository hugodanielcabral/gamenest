import propTypes from "prop-types";
import { CardBackground } from "../../../../../ui/index.js";

import { getFormattedRatings } from "../../../../../../utils/gameDetailsUtils.js";
import { AgeRatingImage } from "./image/AgeRatingImage.jsx";

export const AdditionalInfoAgeRating = ({ data }) => {
  const ageRatings = data?.age_ratings;

  const { formattedEsrbRating, formattedPegiRating } =
    getFormattedRatings(ageRatings);

  return (
    <CardBackground className="col-span-3 md:col-span-1  flex flex-col">
      <h2 className="text-center text-xl md:text-2xl mb-2 text-info">
        Clasificación por edades
      </h2>
      {!ageRatings ? (
        <p className="text-center col-span-4 text-white">
          No hay clasificación por edades disponible.
        </p>
      ) : (
        <div className="flex flex-wrap gap-4 justify-center">
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
