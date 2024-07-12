import getImageUrl from "../../../../../utils/getImageUrl";
import propTypes from "prop-types";

export const CardCover = ({ gameData }) => {
  const COVER_IMAGE =
    gameData?.game_cover ||
    "https://placehold.co/264x352?text=No+Cover+Image+Available";

  const GAME_IMAGE_URL = getImageUrl(COVER_IMAGE, "cover_big");

  const GAME_NAME = gameData?.game_name;

  return (
    <img
      src={getImageUrl(gameData?.game_cover, "cover_big") || GAME_IMAGE_URL}
      loading="lazy"
      alt={`${GAME_NAME} cover`}
      className="absolute inset-0 h-full w-full rounded-md opacity-25 transition-opacity group-hover:opacity-15"
    />
  );
};

CardCover.propTypes = {
  gameData: propTypes.object.isRequired,
};

CardCover.defaultProps = {
  gameData: {},
};
