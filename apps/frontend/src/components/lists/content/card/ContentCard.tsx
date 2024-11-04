import getImageUrl from "../../../../utils/getImageUrl.js";
import cover from "../../../../assets/logos/no-cover.webp";
import { Link } from "react-router-dom";
import { Icon } from "../../../ui/icon/Icon.js";
import { TotalLikes } from "../../../LikeButton.js";
import "./ContentCard.css";
import type { List, Game } from "../../../../types/lists.js";

interface ContentCardProps {
  list: List;

  games: Game[];
}

const fillMissingGames = (games: ContentCardProps["games"]) => {
  const placeholders = Array(3 - games.length).fill({
    game_cover: cover,
    game_id: 0,
    game_name: "No hay juegos",
    game_slug: "no-hay-juegos",
    list_games_id: 0,
    list_id: 0,
  });

  return [...games, ...placeholders];
};

export const ContentCard = ({ list, games }: ContentCardProps) => {
  const gamesWithPlaceholders = fillMissingGames(games);
  return (
    <Link
      to={`/lists/${list.list_id}`}
      className="flex flex-col gap-2 rounded-lg border border-gray-600 bg-base-200 p-4 sm:flex-row"
    >
      <div className="stacked-container mx-auto max-w-44">
        {gamesWithPlaceholders.map((game, index) => (
          <img
            key={index}
            src={getImageUrl(game.game_cover, "cover_big_2x")}
            className="h-full border border-gray-700 bg-white"
            alt={`Cover del juego ${game.game_name}`}
          />
        ))}
      </div>
      <div className="flex-grow space-y-1 md:space-y-2 lg:space-y-3">
        <h3 className="font-nunito text-sm text-white sm:text-base">
          {list.title}
        </h3>
        <small className="font-nunito">
          <span className="flex items-center gap-1">
            {" "}
            <Icon name="icon-[mdi--user]" /> {list.username} -{" "}
            <Icon name="icon-[dashicons--games]" />
            {list.total_games} juegos
          </span>
        </small>
        <p className="line-clamp-3 text-pretty font-nunito text-xs text-gray-300 sm:text-sm">
          {list.description}
        </p>
      </div>
      <div className="-order-1 place-self-end sm:order-3 sm:place-self-start">
        <TotalLikes likes={list.total_likes} />
      </div>
    </Link>
  );
};
