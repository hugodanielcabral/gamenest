import propTypes from "prop-types";
import { HeaderCover } from "./cover/HeaderCover";
import { HeaderGameInfo } from "./gameinfo/HeaderGameInfo";
import { HeaderRating } from "./rating/HeaderRating";

export const GameDetailsHeader = ({ game }) => {
  const { rating, slug } = game;
  console.log(slug);

  return (
    <div className="grid justify-center grid-cols-5 col-span-4 p-3 mt-12 shadow-sm bg-base-100/90">
      {/* Cover */}
      <HeaderCover game={game} />
      {/* Game info */}
      <HeaderGameInfo game={game} />
      {/* Rating */}
      <HeaderRating rating={rating} slug={slug} />
    </div>
  );
};

GameDetailsHeader.propTypes = {
  game: propTypes.object.isRequired,
};
