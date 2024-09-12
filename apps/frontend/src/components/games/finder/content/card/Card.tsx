import { Link } from "react-router-dom";
import { Badge } from "../../../../ui/badge/Badge.tsx";
import { Icon } from "../../../../ui/icon/Icon.tsx";
import getImageUrl from "../../../../../utils/getImageUrl";
import clsx from "clsx";

interface GameProps {
  game: {
    id: string;
    name: string;
    cover: { id: string; url: string };
    platforms: { id: string; abbreviation: string; name: string }[];
    slug: string;
    rating: number;
  };
}

const CardList = ({ children }: { children: React.ReactNode }) => {
  return <li className="text-white">{children}</li>;
};

export const Card = ({ game }: GameProps) => {
  return (
    <Link
      className="flex h-32 gap-4 rounded-lg border border-gray-700 bg-base-100 p-4 transition-all duration-300 ease-in-out hover:scale-95 hover:border-gray-600 sm:h-36 md:h-40 lg:h-44"
      to={`/games/${game.slug}`}
    >
      <img
        src={getImageUrl(game?.cover?.url, "cover_big_2x")}
        alt={game?.name}
        className="rounded-lg"
      />
      <div>
        <h2 className="line-clamp-2 text-pretty text-base text-white sm:text-lg md:text-xl">
          {game.name}
        </h2>
        <ul className="flex flex-wrap gap-1 md:gap-2">
          {game.platforms
            .filter((platform, index) => {
              if (index < 4) return platform;
            })
            .map((platform) => (
              <CardList key={platform.id}>
                <Badge>{platform.abbreviation}</Badge>
              </CardList>
            ))}
          {game.platforms.length > 4 && <span>...</span>}
        </ul>
      </div>
      <div className="flex flex-1 flex-col items-end">
        <Icon
          name="icon-[material-symbols--star]"
          className={clsx("size-3 text-yellow-500 sm:size-6 md:size-8", {
            "text-red-500": game.rating < 40,
            "text-orange-800": game.rating >= 40 && game.rating < 60,
            "text-green-500": game.rating >= 60 && game.rating < 80,
            "text-yellow-500": game.rating >= 80 && game.rating < 90,
            "text-teal-400": game.rating >= 90,
          })}
        />
        <span className="mr-0 text-xs text-white sm:text-lg md:mr-1 md:text-xl">
          {Math.floor(game.rating)}
        </span>
      </div>
    </Link>
  );
};
