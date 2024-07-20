import propTypes from "prop-types";

export const AgeRatingImage = ({ src, alt }) => {
  return (
    <img src={src} alt={alt} className="h-24 sm:h-32 md:h-40 lg:h-44 xl:h-48" />
  );
};

AgeRatingImage.propTypes = {
  src: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
};

AgeRatingImage.defaultProps = {
  src: "",
  alt: "",
};
