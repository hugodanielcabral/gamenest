import { useDataFetch } from "../../../../hooks/useDataFetch";
import { Card } from "./card/Card";
import { Toaster } from "sonner";
import { useQueryParams } from "../../../../hooks/useQueryParams";
import { createPortal } from "react-dom";
import type { IGDBGamesProps } from "../../../../types/igdbGames.ts";
import { GamesFinderContentSkeleton } from "./skeleton/GamesFinderContentSkeleton.tsx";

interface GamesProps {
  fetchData: IGDBGamesProps[];
  isLoading: boolean;
}

export const GamesFinderContent = () => {
  const { getQueryString } = useQueryParams();

  const { fetchData: gamesData, isLoading } = useDataFetch<
    GamesProps["fetchData"]
  >("games", `${getQueryString()}`);

  if (isLoading) {
    return <GamesFinderContentSkeleton />;
  }

  return (
    <div className="col-span-3 grid h-fit grid-cols-1 gap-4 xl:grid-cols-2">
      {createPortal(<Toaster position="top-center" />, document.body)}
      {gamesData && gamesData.length > 0 ? (
        gamesData.map((game) => <Card key={game.id} game={game} />)
      ) : (
        <div className="col-span-full flex min-h-screen justify-center">
          <p className="text-pretty font-nunito text-sm italic text-gray-300 sm:text-lg md:text-xl lg:text-2xl">
            No se encontraron resultados para tu búsqueda. Verifica los filtros
            aplicados.
          </p>
        </div>
      )}
    </div>
  );
};
