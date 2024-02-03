import propTypes from "prop-types";

export const GameCardRating = ({ rating }) => {
  const getRatingColor = (rating) => {
    if (rating >= 90) return "text-success";

    if (rating >= 70) return "text-success";

    if (rating >= 50) return "text-warning";

    return "text-error";
  };

  const getRatingCalification = (rating) => {
    if (rating >= 90) return "Excellent";

    if (rating >= 70) return "Good";

    if (rating >= 50) return "Okay";

    return "Poor";
  };
  return (
    <div className="hidden md:flex-col md:flex">
      <div
        className={`radial-progress ${getRatingColor(Math.round(rating))}`}
        style={{ "--value": `${Math.round(rating)}` }}
        role="progressbar"
      >
        {Math.round(rating)}%
      </div>
      <h3
        className={`text-center ${getRatingColor(
          Math.round(rating)
        )} font-bold`}
      >
        {getRatingCalification(Math.round(rating))}
      </h3>
    </div>
  );
};

GameCardRating.propTypes = {
  rating: propTypes.number.isRequired,
};
