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
    <li className="flex gap-2 p-4 group">
      <img
        src={getImageUrl(coverUrl, "cover_small")}
        alt={gameName}
        className="h-20 border-2 border-gray-500 rounded-md group-hover:border-purple-500 group-hover:border-2 transition-all duration-300 ease-in-out"
      />
      <div className="flex flex-col">
        <a
          href={`/games/${slug}`}
          className="line-clamp-1 text-ellipsis text-xs text-purple-200 sm:text-sm md:text-base lg:text-lg"
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
