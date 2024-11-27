import { useDataFetch } from "../../../hooks/useDataFetch";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { Loading } from "../../ui/loading/Loading.tsx";
import { ContentCard } from "./card/ContentCard.tsx";
import type { List } from "../../../types/lists.ts";

interface ListsContentProps {
  pathUrl: string;
}

interface ListsProps {
  fetchData: {
    lists: List[];
    games: {
      list_id: number;
      games: {
        list_games_id: number;
        list_id: number;
        game_id: number;
        game_slug: string;
        game_name: string;
        game_cover: string;
      }[];
    }[];
  };
  isLoading: boolean;
}

export const ListsContent = ({ pathUrl }: ListsContentProps) => {
  const { getQueryString } = useQueryParams();

  const { fetchData, isLoading } = useDataFetch<ListsProps["fetchData"]>(
    `${pathUrl}`,
    `${getQueryString()}`,
  );
  
  if (isLoading) {
    return (
      <Loading
        className="flex min-h-screen items-start justify-center lg:col-span-3"
        color="info"
        type="dots"
      />
    );
  }

  return (
    <div className="grid h-fit grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {fetchData?.lists?.length > 0 ? (
        fetchData.lists.map((list) => (
          <ContentCard
            key={list.list_id}
            list={list}
            games={
              fetchData.games.find((game) => game.list_id === list.list_id)
                ?.games || []
            }
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
