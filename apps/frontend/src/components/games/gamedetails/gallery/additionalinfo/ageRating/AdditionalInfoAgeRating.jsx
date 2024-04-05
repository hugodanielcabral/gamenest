import propTypes from "prop-types";

export const AdditionalInfoAgeRating = () => {
  return (
    <div className="col-span-3 md:col-span-1 bg-base-200/90 shadow-lg rounded-sm border-2 border-white/10 p-3">
      <h2 className="text-center text-3xl md:text-4xl font-semibold mb-2 text-info">
        Age Rating
      </h2>
    </div>
  );
};

AdditionalInfoAgeRating.propTypes = {
  data: propTypes.object.isRequired,
};
