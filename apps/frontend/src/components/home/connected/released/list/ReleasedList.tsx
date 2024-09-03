import getImageUrl from "../../../../../utils/getImageUrl";
import { DateTime } from "luxon";
import { Card, CardContent, CardImage } from "../../../../ui/card/Card";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";
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
    <Card className="h-72 md:h-80 lg:h-96">
      <CardImage
        imgSrc={() => getImageUrl(coverUrl, "cover_big_2x")}
        title={gameName}
      />
      <CardContent className="space-y-4">
        <h4 className="text-sm font-bold text-white md:text-lg lg:text-xl">{gameName}</h4>
        <p className="text-xs text-white md:text-sm lg:text-lg">
          {DateTime.fromSeconds(releaseDate).toLocaleString()}
        </p>
        <Link to={`/games/${slug}`}>
          <FaExternalLinkAlt className="absolute right-2 top-2 z-10 size-6 text-gray-300 opacity-0 transition-colors duration-300 ease-in-out hover:text-info group-hover:opacity-100" />
        </Link>
      </CardContent>
    </Card>
  );
};
