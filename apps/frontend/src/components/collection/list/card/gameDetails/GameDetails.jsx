import propTypes from "prop-types";
import { getStatus } from "../../../../../utils/getStatus";

export const GameDetails = ({ game }) => (
  <section className="flex-grow flex-shrink basis-60">
    <h2 className="text-lg md:text-1xl lg:text-2xl font-bold text-white">
      {game.name}
    </h2>
    <article className="flex gap-x-2 flex-wrap *:p-1  *:text-white *:font-semibold my-2 *:md:text-sm *:text-xs *:lg:text-base line *:border-white *:border-2 *:border-opacity-40 *:rounded-md">
      <section className="p-1 text-white bg-error">
        {game.platform_name}
      </section>
      <section className="p-1 bg-info text-white flex items-center gap-1">
        <img
          src={getStatus(game.status_name).iconId}
          alt={game.status_name}
          className="w-4 h-4 mr-1"
        />
        {game.status_name}
      </section>
    </article>
    <p className="text-balance text-white line-clamp-2 md:line-clamp-2">
      i need to defeat the boss in the last level
    </p>
  </section>
);

GameDetails.propTypes = {
  game: propTypes.object.isRequired,
};
