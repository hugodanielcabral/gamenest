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
    <Card className="w-40 sm:w-44 md:w-52 lg:w-64" linkTo={`/games/${slug}`}>
      <CardImage
        imgSrc={() => getImageUrl(coverUrl, "cover_big_2x")}
        title={gameName}
        className="h-48 sm:h-60 md:h-72 lg:h-80 xl:h-96"
      />
      <CardContent>
        <h3 className="text-xs sm:text-sm md:text-base font-semibold line-clamp-1 text-pretty">{gameName}</h3>
        <p className="text-xs md:text-sm text-base-content-secondary">
          {DateTime.fromSeconds(releaseDate).toFormat("DD")}
        </p>
      </CardContent>
    </Card>
  );
};
