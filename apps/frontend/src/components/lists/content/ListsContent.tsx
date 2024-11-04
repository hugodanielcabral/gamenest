import { useDataFetch } from "../../../hooks/useDataFetch";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { Loading } from "../../ui/loading/Loading.tsx";
import { ContentCard } from "./card/ContentCard.tsx";

interface ListsProps {
  fetchData: {
    lists: {
      list_id: number;
      title: string;
      description: string;
      user_id: number;
      visibility: boolean;
      created_at: string;
      updated_at: string;
      username: string;
      total_games: number;
      total_likes: string;
    }[];
    games: {
      list_games_id: number;
      list_id: number;
      game_id: number;
      game_slug: string;
      game_name: string;
      game_cover: string;
    }[];
  };
  isLoading: boolean;
}

export const ListsContent = () => {
  const { getQueryString } = useQueryParams();

  const { fetchData, isLoading } = useDataFetch<ListsProps["fetchData"]>(
    "lists",
    `${getQueryString()}`,
  );

  if (isLoading) {
    return (
      <Loading
        className="flex min-h-screen items-start justify-center lg:col-span-3"
        color="primary"
        type="ring"
      />
    );
  }

  return (
    <div className="grid h-fit grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {fetchData.lists.length > 0 ? (
        fetchData.lists.map((list) => (
          <ContentCard
            key={list.list_id}
            list={list}
            games={fetchData.games.filter(
              (game) => game.list_id === list.list_id,
            )}
          />
        ))
      ) : (
        <div className="col-span-full flex min-h-screen justify-center">
          <p className="mt-10 text-pretty text-center font-nunito text-lg text-white sm:text-2xl md:text-3xl lg:text-4xl">
            No se encontró ninguna lista.
          </p>
        </div>
      )}
    </div>
  );
};
