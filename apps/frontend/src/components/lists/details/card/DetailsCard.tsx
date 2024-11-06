import { Link } from "react-router-dom";
import type { Game } from "../../../../types/lists";
import getImageUrl from "../../../../utils/getImageUrl";

interface DetailsCardProps {
  game: Game;
  ownedGame: boolean;
}

export const DetailsCard = ({ game, ownedGame }: DetailsCardProps) => {
  return (
    <Link
      to={`/games/${game.game_slug}`}
      className={`relative overflow-hidden md:tooltip md:tooltip-bottom md:tooltip-info`}
      data-tip={game.game_name}
    >
      {ownedGame && (
        <span className="absolute bottom-0 left-0 right-0 bg-base-100 bg-opacity-85 p-1 text-xs font-bold text-white">
          En tu colección
        </span>
      )}
      <img
        src={getImageUrl(game.game_cover, "cover_big_2x")}
        alt={game.game_name}
        className="rounded-lg"
      />
    </Link>
  );
};
