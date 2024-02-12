import propTypes from "prop-types";
import { GameCardRating } from "../../../gameshome/card/rating/GameCardRating";

export const HeaderRating = ({ rating }) => {
  return (
    <div className="flex flex-col items-center col-span-5 gap-y-3 md:justify-evenly md:col-span-1">
      <GameCardRating rating={rating} />
      <button
        className="text-base font-bold btn btn-warning hover:btn-warning/50 disabled:bg-stone-500 disabled:cursor-not-allowed"
        disabled
      >
        Add to the collection
      </button>
    </div>
  );
};

HeaderRating.propTypes = {
  rating: propTypes.number.isRequired,
};
