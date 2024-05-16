import propTypes from "prop-types";
import {
  esrbRatingsData,
  pegiRatingsData,
} from "../../../../../../utils/getGameDetailsAgeRatingCover.js";
import { CardBackground } from "../../../../../ui/cardBackground/cardBackground.jsx";

export const AdditionalInfoAgeRating = ({ data }) => {
  if (!data.age_ratings)
    return (
      <CardBackground className="col-span-3 md:col-span-1  flex flex-col">
        <h2 className="text-center mt-2">No age rating available.</h2>
      </CardBackground>
    );

  const excludedAgeRatings = data?.age_ratings
    .filter(
      (rating) =>
        rating.category !== 3 &&
        rating.category !== 4 &&
        rating.category !== 5 &&
        rating.category !== 6 &&
        rating.category !== 7
    )
    .sort((a, b) => a.category - b.category);

  const esrbRating = esrbRatingsData.find(
    (rating) => rating.igdbRating === excludedAgeRatings[0].rating
  );

  const pegiRating = pegiRatingsData.find(
    (rating) => rating.igdbRating === excludedAgeRatings[1].rating
  );

  return (
    <CardBackground className="col-span-3 md:col-span-1  flex flex-col">
      <h2 className="text-center text-3xl md:text-4xl font-semibold mb-2 text-info">
        Age Rating
      </h2>
      <div className="flex flex-wrap gap-4 justify-center">
        <img
          src={esrbRating.image}
          alt={`ESRB Rating ${esrbRating.rating}`}
          className="w-20 h-28 md:w-24 md:h-32"
        />
        <img
          src={pegiRating.image}
          alt={`PEGI Rating ${pegiRating.rating}`}
          className="w-20 h-28 md:w-24 md:h-32"
        />
      </div>
    </CardBackground>
  );
};

AdditionalInfoAgeRating.propTypes = {
  data: propTypes.object.isRequired,
};
