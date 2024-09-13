import { useLocation } from "react-router-dom";
import { useDataFetch } from "../../../../hooks/useDataFetch";
import { Card } from "./card/Card";
import { Toaster } from "sonner";
import { Loading } from "../../../ui/loading/Loading.tsx";
import queryString from "query-string";

interface GamesProps {
  fetchData: {
    id: string;
    name: string;
    cover: { id: string; url: string };
    platforms: { id: string; abbreviation: string; name: string }[];
    slug: string;
    rating: number;
  }[];
  isLoading: boolean;
}

export const GamesFinderContent = () => {
  const { search } = useLocation();
  const query = queryString.parse(search);
  const parsedQuery = new URLSearchParams(
    query as Record<string, string>,
  ).toString();

  const { fetchData: gamesData, isLoading } = useDataFetch(
    "games",
    `${parsedQuery}`,
  ) as GamesProps;

  if (isLoading) {
    return (
      <Loading
        className="col-span-full flex justify-center min-h-screen items-center"
        color="primary"
        type="ring"
      />
    );
  }

  return (
    <>
      <Toaster richColors position="top-center" />
      {gamesData.length > 0 ? (
        gamesData?.map((game) => <Card key={game.id} game={game} />)
      ) : (
        <div className="col-span-full flex justify-center min-h-screen">
          <p className="text-white lg:text-4xl">
            No se encontraron juegos para mostrar 😢.
          </p>
        </div>
      )}
    </>
  );
};
