import { useDataFetch } from "../../../../hooks/useDataFetch";
import { Card } from "./card/Card";
import { Toaster } from "sonner";
import { Loading } from "../../../ui/loading/Loading.tsx";
import { useQueryParams } from "../../../../hooks/useQueryParams";

interface GamesProps {
  fetchData: {
    id: string;
    name: string;
    cover: { id: string; url: string };
    platforms: { id: string; abbreviation: string; name: string }[];
    slug: string;
    rating: number;
    parent_game?: { id: string; name: string; slug: string };
    first_release_date: number;
    version_parent?: { id: string; name: string; slug: string };
  }[];
  isLoading: boolean;
}

export const GamesFinderContent = () => {
  const { getQueryString } = useQueryParams();
  const { fetchData: gamesData, isLoading } = useDataFetch(
    "games",
    `${getQueryString()}`,
  ) as GamesProps;

  if (isLoading) {
    return (
      <Loading
        className="lg:col-span-3 flex min-h-screen items-start justify-center"
        color="primary"
        type="ring"
      />
    );
  }

  return (
    <div className="col-span-3 grid grid-cols-1 xl:grid-cols-2 gap-4 h-fit">
      <Toaster position="top-center" />
      {gamesData.length > 0 ? (
        gamesData?.map((game) => <Card key={game.id} game={game} />)
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
