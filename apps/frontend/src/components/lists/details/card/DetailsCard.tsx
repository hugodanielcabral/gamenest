import { Link } from "react-router-dom";
import type { Game } from "../../../../types/lists";
import getImageUrl from "../../../../utils/getImageUrl";

interface DetailsCardProps {
  game: Game;
}

export const DetailsCard = ({ game }: DetailsCardProps) => {
  return (
    <Link
      to={`/games/${game.game_slug}`}
      className="md:tooltip md:tooltip-bottom md:tooltip-info"
      data-tip={game.game_name}
    >
      <img
        src={getImageUrl(game.game_cover, "cover_big_2x")}
        alt={game.game_name}
        className="rounded-lg"
      />
    </Link>
  );
};
