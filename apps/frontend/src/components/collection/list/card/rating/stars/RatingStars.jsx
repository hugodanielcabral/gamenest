import clsx from "clsx";
import propTypes from "prop-types";
export const RatingStars = ({
  TOTAL_STARS,
  rating,
  GAME_NAME,
  handleOnChange,
  handleShowModal,
}) => {
  return (
    <div className="rating" onClick={handleShowModal}>
      {TOTAL_STARS.map((star) => (
        <input
          key={star}
          type="radio"
          name={`rating-${GAME_NAME}`}
          value={star}
          checked={star === rating}
          disabled={rating === star}
          onChange={() => handleOnChange(star)}
          className={clsx(
            {
              "bg-gray-500 opacity-75": rating === 0,
              "bg-red-500": rating === 1 || rating === 2,
              "bg-green-500": rating === 3 || rating === 4,
              "bg-yellow-500": rating === 5,
            },
            "mask mask-star disabled:cursor-not-allowed",
          )}
        />
      ))}
    </div>
  );
};

RatingStars.propTypes = {
  TOTAL_STARS: propTypes.array.isRequired,
  rating: propTypes.number.isRequired,
  GAME_NAME: propTypes.string.isRequired,
  handleOnChange: propTypes.func.isRequired,
  handleShowModal: propTypes.func.isRequired,
};

RatingStars.defaultProps = {
  TOTAL_STARS: [],
  rating: 1,
  GAME_NAME: "",
  handleOnChange: () => {},
  handleShowModal: () => {},
};
