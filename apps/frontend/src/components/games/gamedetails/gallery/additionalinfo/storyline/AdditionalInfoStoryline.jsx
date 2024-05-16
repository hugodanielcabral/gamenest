import propTypes from "prop-types";
import { CardBackground } from "../../../../../ui/cardBackground/cardBackground";

export const AdditionalInfoStoryline = ({ data }) => {
  if (!data.storyline)
    return (
      <CardBackground className="col-span-3 max-h-60 md:max-h-96 overflow-auto">
        <h2 className="text-center mt-2">No storyline available.</h2>
      </CardBackground>
    );

  return (
    <CardBackground className="col-span-3 max-h-60 md:max-h-96 overflow-auto">
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
    </CardBackground>
  );
};

AdditionalInfoStoryline.propTypes = {
  data: propTypes.object.isRequired,
};
