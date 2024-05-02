import propTypes from "prop-types";
import getImageUrl from "../../../../../utils/getImageUrl";

export const CoverImage = ({ coverImage, gameName }) => (
  <figure className="basis-32 flex-grow-0 flex-shrink-0">
    <img
      src={getImageUrl(coverImage, "cover_big")}
      loading="lazy"
      alt={`${gameName} cover`}
      className="flex-grow-0 w-24 h-fit md:w-28 border border-info group-hover:border-error transition-all duration-300 ease-in-out"
    />
  </figure>
);

CoverImage.propTypes = {
  coverImage: propTypes.string.isRequired,
  gameName: propTypes.string.isRequired,
};
