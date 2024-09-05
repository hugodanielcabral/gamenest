import { Link } from "react-router-dom";
import { Card, CardContent, CardImage } from "../../../../ui/card/Card";
import { FaExternalLinkAlt } from "react-icons/fa";
import getImageUrl from "../../../../../utils/getImageUrl";
import { GameDetailsContentProps } from "../../../../../types/gameDetails";

export const DLCs = ({ gameDetail }: GameDetailsContentProps) => {
  return (
    <div className="col-span-full space-y-4">
      <h2 className="text-pretty text-center text-base text-white sm:text-lg lg:text-xl xl:text-2xl">
        Paquetes y DLCs de {gameDetail?.name}
      </h2>
      {gameDetail.dlcs && gameDetail.dlcs.length > 0 && (
        <>
          <h3 className="text-base text-gray-300 sm:text-lg lg:text-xl xl:text-2xl">
            DLCs
          </h3>
          <div className="overflow-x-auto">
            <div className="flex w-max space-x-2">
              {gameDetail.dlcs.map((dlc) => (
                <Card
                  key={dlc.id}
                  className="group h-36 w-28 focus:outline-none sm:h-40 sm:w-32 md:h-44 md:w-36 lg:h-48 lg:w-40 xl:h-56 xl:w-44"
                >
                  <CardImage
                    imgSrc={() => getImageUrl(dlc.cover.url, "cover_big_2x")}
                    title={dlc?.name}
                  />
                  <CardContent className="p-2">
                    <h2 className="card-title text-pretty text-center text-xs md:text-sm">
                      {dlc.name}
                    </h2>
                    <Link to={`/games/${dlc.slug}`}>
                      <FaExternalLinkAlt className="absolute right-2 top-2 z-10 size-4 text-gray-300 opacity-0 transition-colors duration-300 ease-in-out hover:text-info group-hover:opacity-100 md:size-6" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}

      {gameDetail.bundles && gameDetail.bundles.length > 0 && (
        <>
          <h3 className="mt-4 text-base text-gray-300 sm:text-lg lg:text-xl xl:text-2xl">
            Paquetes
          </h3>
          <div className="overflow-x-auto">
            <div className="flex w-max space-x-2">
              {gameDetail.bundles.map((bundle) => (
                <Card key={bundle.id} className="group focus:outline-none">
                  <CardImage
                    imgSrc={() => getImageUrl(bundle.cover.url, "cover_big_2x")}
                    title={bundle?.name}
                    className="group h-36 w-28 focus:outline-none sm:h-40 sm:w-32 md:h-44 md:w-36 lg:h-48 lg:w-40 xl:h-56 xl:w-44"
                  />
                  <CardContent className="p-2">
                    <h2 className="card-title text-pretty text-center text-xs md:text-sm">
                      {bundle.name}
                    </h2>
                    <Link to={`/games/${bundle.slug}`}>
                      <FaExternalLinkAlt className="absolute right-2 top-2 z-10 size-4 text-gray-300 opacity-0 transition-colors duration-300 ease-in-out hover:text-info group-hover:opacity-100 md:size-6" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
