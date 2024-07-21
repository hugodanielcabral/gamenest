import { Link } from "react-router-dom";
import { CardImage } from "../../../../../ui/card/image/CardImage";
import getImageUrl from "../../../../../../utils/getImageUrl";
import { Carousel } from "../../../../../ui/carousel/Carousel";

interface AdditionalInfoSimilarGamesProps {
  similarGamesData: {
    id: number;
    slug: string;
    cover: {
      url: string;
    };
    name: string;
  }[];
  currentGameName: string;
}

export const AdditionalInfoSimilarGames = ({
  similarGamesData,
  currentGameName,
}: AdditionalInfoSimilarGamesProps) => {
  return (
    <div className="col-span-3 h-fit min-h-fit rounded-md border-2 border-gray-700 bg-base-100 bg-opacity-70 p-4 shadow-transparent">
      <h3 className="text-pretty text-center text-xs uppercase tracking-wider text-blue-400 sm:text-sm md:text-lg lg:text-xl xl:text-2xl">
        Juegos similares a <span className="text-white">{currentGameName}</span>
      </h3>
      <div className="flex justify-center">
        {similarGamesData ? (
          <Carousel
            length={similarGamesData.length}
            start={0}
            end={3}
            className="bg-transparent"
          >
            {similarGamesData.map((game) => (
              <li key={game.id}>
                <Link to={`/games/${game.slug}`}>
                  <CardImage
                    src={getImageUrl(game.cover.url, "cover_big_2x")}
                    alt={game.name}
                    className="h-24 border-2 border-gray-700 sm:h-44 md:h-56 lg:h-64 xl:h-80"
                  />
                </Link>
              </li>
            ))}
          </Carousel>
        ) : (
          <p className="text-pretty text-center text-xs text-gray-400 md:text-base">
            No se encontraron juegos similares
          </p>
        )}
      </div>
    </div>
  );
};
