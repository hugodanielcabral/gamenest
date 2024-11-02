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
        total_likes: number;
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
  
  const { fetchData, isLoading } = useDataFetch<ListsProps['fetchData']>(
    "lists",
    `${getQueryString()}`
  );

  if (isLoading) {
    return (
      <Loading
        className="lg:col-span-3 flex min-h-screen items-start justify-center"
        color="primary"
        type="ring"
      />
    );
  }

  console.log(fetchData)
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 h-fit">
      {
        fetchData.lists.map((list) => <ContentCard list={list} games={fetchData.games.filter((game) => game.list_id === list.list_id)}/>)
      }


    </div>
  );
};
