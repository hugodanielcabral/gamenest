import propTypes from "prop-types";
import { CardBackground } from "../../../../../ui/cardBackground/cardBackground";

export const AdditionalInfoStoryline = ({ data }) => {
  return (
    <CardBackground className="col-span-3 max-h-60 md:max-h-96 overflow-auto">
      <h2 className="text-center text-xl md:text-2xl mb-2 text-error">
        Storyline
      </h2>
      {!data.storyline ? (
        <p className="text-center col-span-4 text-white">
          No storyline available.
        </p>
      ) : (
        <p className="text-lg text-pretty md:text-xl text-white">
          {data?.storyline?.length > 0 ? (
            data.storyline
          ) : (
            <p className="text-center mt-2">No storyline available.</p>
          )}
        </p>
      )}
    </CardBackground>
  );
};

AdditionalInfoStoryline.propTypes = {
  data: propTypes.object.isRequired,
};
