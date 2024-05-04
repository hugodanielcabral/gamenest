import getImageUrl from "../../../../../utils/getImageUrl";
import propTypes from "prop-types";

export const CardCover = ({ gameData }) => {
  const COVER_IMAGE =
    gameData?.game_cover ||
    "https://placehold.co/264x352?text=No+Cover+Image+Available";

  const GAME_IMAGE_URL = getImageUrl(COVER_IMAGE, "cover_big");

  const GAME_NAME = gameData?.game_name;

  return (
    <figure className="col-span-2 md:col-span-1 row-span-2 mx-auto">
      <img
        src={getImageUrl(gameData?.game_cover, "cover_big") || GAME_IMAGE_URL}
        loading="lazy"
        alt={`${GAME_NAME} cover`}
        className="w-24 h-fit md:w-28 border border-info transition-all duration-300 ease-in-out"
      />
    </figure>
  );
};

CardCover.propTypes = {
  gameData: propTypes.object.isRequired,
};

CardCover.defaultProps = {
  gameData: {},
};
