import propTypes from "prop-types";
import { HeaderCover } from "./cover/HeaderCover";
import { HeaderGameInfo } from "./gameinfo/HeaderGameInfo";
import { HeaderRating } from "./rating/HeaderRating";

export const GameDetailsHeader = ({ game }) => {
  const { rating } = game;
  return (
    <div className="grid justify-center grid-cols-5 col-span-4 p-3 shadow-sm bg-base-300">
      {/* Cover */}
      <HeaderCover game={game} />
      {/* Game info */}
      <HeaderGameInfo game={game} />
      {/* Rating */}
      <HeaderRating rating={rating} />
    </div>
  );
};

GameDetailsHeader.propTypes = {
  game: propTypes.object.isRequired,
};
