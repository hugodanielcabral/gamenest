import propTypes from "prop-types";
import {
  CardBackground,
  CardActions,
  CardCover,
  CardHoursPlayed,
  CardPlatform,
  CardProgressNotes,
  CardRating,
  CardStatus,
} from "./index.js";
import { Link } from "react-router-dom";
import { CardOwnership } from "./ownership/CardOwnership.jsx";

export const ListCard = ({ gameData }) => {
  const GAME_PATH = `/collection/${gameData.game_slug}`;
  return (
    <CardBackground className="grid grid-cols-3 gap-y-2 md:gap-y-0 group border-l-4 border-l-info hover:border-l-error transition-all duration-300 ease-in-out md:max-h-44">
      <Link
        to={GAME_PATH}
        className="col-span-3 md:col-span-2 grid grid-cols-4 grid-rows-2"
      >
        <CardCover gameData={gameData} />
        <div className="flex md:flex-row flex-col justify-evenly gap-x-5 col-span-2 md:col-span-3 row-span-2 md:row-span-1">
          <h2 className="text-white font-bold self-center text-xs sm:text-base md:text-lg text-pretty text-ellipsis">
            {gameData?.game_name}
          </h2>
          <CardStatus gameData={gameData} />
          <CardOwnership gameData={gameData} />
          <CardPlatform gameData={gameData} />
        </div>
        <CardProgressNotes gameData={gameData} />
      </Link>
      <section className="col-span-3 md:col-span-1 grid grid-cols-3 grid-rows-2 ">
        <CardHoursPlayed gameData={gameData} />
        <CardActions gameData={gameData} />
        <CardRating gameData={gameData} />
      </section>
    </CardBackground>
  );
};

ListCard.propTypes = {
  gameData: propTypes.object.isRequired,
};

ListCard.defaultProps = {
  gameData: {},
};
