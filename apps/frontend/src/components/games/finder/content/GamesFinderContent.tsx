import { useDataFetch } from "../../../../hooks/useDataFetch";
import { Card } from "./card/Card";
import { Toaster } from "sonner";
import { Loading } from "../../../ui/loading/Loading.tsx";
import { useQueryParams } from "../../../../hooks/useQueryParams";
import { createPortal } from "react-dom";
import type { IGDBGamesProps } from "../../../../types/igdbGames.ts";

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
    return (
      <Loading
        className="flex items-start justify-center lg:col-span-3"
        color="info"
        type="dots"
      />
    );
  }

  return (
    <div className="col-span-3 grid h-fit grid-cols-1 gap-4 xl:grid-cols-2">
      {createPortal(<Toaster position="top-center" />, document.body)}
      {gamesData && gamesData.length > 0 ? (
        gamesData.map((game) => <Card key={game.id} game={game} />)
      ) : (
        <div className="col-span-full flex min-h-screen justify-center">
          <p className="mt-10 text-pretty text-center font-nunito text-lg text-white sm:text-2xl md:text-3xl lg:text-4xl">
            No se encontraron resultados para tu búsqueda. Verifica los filtros
            aplicados.
          </p>
        </div>
      )}
    </div>
  );
};
