import propTypes from "prop-types";
import { GameCardRating } from "../../../gameshome/card/rating/GameCardRating";

export const HeaderRating = ({ rating }) => {
  return (
    <div className="flex flex-col items-center col-span-5 gap-y-3 md:justify-evenly md:col-span-1">
      <GameCardRating rating={rating} />
      <button className="text-base font-bold btn btn-primary hover:btn-primary/50">
        Add to the collection
      </button>
    </div>
  );
};

HeaderRating.propTypes = {
  rating: propTypes.number.isRequired,
};
