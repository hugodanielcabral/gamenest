import getImageUrl from "../../../../../utils/getImageUrl";
import { DateTime } from "luxon";
interface ReleasedListProps {
  coverUrl: string;
  gameName: string;
  releaseDate: number;
  slug: string;
}

export const ReleasedList = ({
  coverUrl,
  gameName,
  releaseDate,
  slug,
}: ReleasedListProps) => {
  return (
    <li className="flex gap-2 p-4">
      <img
        src={getImageUrl(coverUrl, "cover_small")}
        alt={gameName}
        className="h-20"
      />
      <div className="flex flex-col">
        <a
          href={`/games/${slug}`}
          target="_blank"
          className="line-clamp-1 text-ellipsis text-xs text-purple-300 sm:text-sm md:text-base lg:text-lg"
        >
          {gameName}
        </a>
        <span className="block text-sm text-gray-400 sm:text-base">
          {DateTime.fromSeconds(releaseDate).toLocaleString()}
        </span>
      </div>
    </li>
  );
};
