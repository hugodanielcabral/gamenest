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
          className={
            rating === 0
              ? "mask mask-star bg-gray-500"
              : "mask mask-star disabled:cursor-not-allowed"
          }
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
