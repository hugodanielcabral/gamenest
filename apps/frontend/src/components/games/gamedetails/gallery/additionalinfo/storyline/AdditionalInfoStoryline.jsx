import propTypes from "prop-types";

export const AdditionalInfoStoryline = ({ data }) => {
  return (
    <div className="col-span-3  bg-base-200/90 shadow-lg rounded-sm border-2 border-white/10 p-3 max-h-60 md:max-h-96 overflow-auto">
      <h2 className="text-center text-3xl md:text-4xl font-semibold text-error">
        Storyline
      </h2>
      <p className="text-base text-pretty md:text-2xl">
        {data?.storyline?.length > 0 ? (
          data.storyline
        ) : (
          <p className="text-center mt-2">No storyline available.</p>
        )}
      </p>
    </div>
  );
};

AdditionalInfoStoryline.propTypes = {
  data: propTypes.object.isRequired,
};
