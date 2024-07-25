import getImageUrl from "../../../../../utils/getImageUrl";
import propTypes from "prop-types";

export const CardCover = ({ gameData }) => {
  const COVER_IMAGE =
    gameData?.game_cover ||
    "https://placehold.co/264x352?text=No+Cover+Image+Available";

  const GAME_IMAGE_URL = getImageUrl(COVER_IMAGE, "cover_big_2x");

  const GAME_NAME = gameData?.game_name;

  return (
    <img
      src={getImageUrl(gameData?.game_cover, "cover_big_2x") || GAME_IMAGE_URL}
      loading="lazy"
      alt={`${GAME_NAME} cover`}
      className="absolute inset-0 h-full w-full rounded-md border-2 border-white opacity-25 transition-opacity group-hover:opacity-25 md:border-gray-700 md:opacity-100"
    />
  );
};

CardCover.propTypes = {
  gameData: propTypes.object.isRequired,
};

CardCover.defaultProps = {
  gameData: {},
};
