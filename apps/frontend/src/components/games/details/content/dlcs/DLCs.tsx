import { Card, CardContent, CardImage } from "../../../../ui/card/Card";
import getImageUrl from "../../../../../utils/getImageUrl";
import { GameDetailsContentProps } from "../../../../../types/gameDetails";

export const DLCs = ({ gameDetail }: GameDetailsContentProps) => {
  return (
    <div className="space-y-4">
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
                  className="w-40 border border-gray-600 bg-base-300 sm:w-44 md:w-52 lg:w-60 xl:w-64"
                  linkTo={`/games/${dlc.slug}`}
                >
                  <CardImage
                    imgSrc={() => getImageUrl(dlc?.cover?.url, "cover_big_2x")}
                    title={dlc?.name}
                    className="h-48 sm:h-60 md:h-72 lg:h-80"
                  />
                  <CardContent>
                    <h2 className="line-clamp-2 text-pretty text-xs font-semibold sm:text-sm md:text-base">
                      {dlc.name}
                    </h2>
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
                <Card
                  key={bundle.id}
                  className="w-40 border border-gray-600 bg-base-300 sm:w-44 md:w-52 lg:w-60 xl:w-64"
                  linkTo={`/games/${bundle.slug}`}
                >
                  <CardImage
                    imgSrc={() => getImageUrl(bundle?.cover?.url, "cover_big_2x")}
                    title={bundle?.name}
                    className="h-48 sm:h-60 md:h-72 lg:h-80"
                  />
                  <CardContent>
                    <h2 className="line-clamp-2 text-pretty text-xs font-semibold sm:text-sm md:text-base">
                      {bundle.name}
                    </h2>
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
