import propTypes from "prop-types";
import { GameCardRating } from "../../../gameshome/card/rating/GameCardRating";
import { Button } from "../../../../ui/index.js";
import { useNavigate } from "react-router-dom";

export const HeaderRating = ({ rating, slug }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center col-span-5 gap-y-3 md:justify-evenly md:col-span-1">
      <GameCardRating rating={rating} />

      <Button
        onClick={() => navigate(`/collection/add/${slug}`)}
        className="text-lg"
      >
        Add to collection
      </Button>
    </div>
  );
};

HeaderRating.propTypes = {
  rating: propTypes.number.isRequired,
  slug: propTypes.string.isRequired,
};
