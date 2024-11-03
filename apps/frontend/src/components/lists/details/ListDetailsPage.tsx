import { useParams } from "react-router-dom";
import { Layout } from "../../layout/Layout";
import { Container } from "../../ui/container/Container";
import { useDataFetch } from "../../../hooks/useDataFetch";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { Loading } from "../../ui/loading/Loading.tsx";
import { ListDetailsUserPanel } from "./panel/ListDetailsUserPanel.tsx";

interface ListsProps {
  fetchData: {
    list: {
      list_id: number;
      title: string;
      description: string;
      user_id: number;
      visibility: boolean;
      created_on: string;
      updated_on: string;
      username: string;
      total_games: number;
      total_likes: string;
    };
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

export const ListDetailsPage = () => {
  const { listId } = useParams();
  const { getQueryString } = useQueryParams();

  const { fetchData, isLoading } = useDataFetch<ListsProps["fetchData"]>(
    `lists/${listId}`,
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
  console.log(fetchData);

  return (
    <Layout>
      <Container className="flex flex-col space-y-4 p-4">
        <section className="">
          <div>
            <h2 className="font-nunito text-4xl">{fetchData.list.title}</h2>
            <p className="font-nunito text-xl text-gray-300">
              {fetchData.list.description}
            </p>
          </div>
        </section>
        <section className="grid grid-cols-4">
          <div className="col-span-full md:col-span-3">
            <h2>Juegos</h2>
            <ul>
              {fetchData.games.map((game) => (
                <li key={game.list_games_id}>
                  <img src={game.game_cover} alt={game.game_name} />
                  <h3>{game.game_name}</h3>
                </li>
              ))}
            </ul>
          </div>
          <ListDetailsUserPanel list={fetchData.list} />
        </section>
      </Container>
    </Layout>
  );
};
