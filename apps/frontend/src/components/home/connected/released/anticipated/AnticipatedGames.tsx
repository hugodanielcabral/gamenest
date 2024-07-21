import { useFetch } from "../../../../../hooks/useFetch";
import { ReleasedList } from "../list/ReleasedList";
import { Loading } from "../../../../ui/loading/Loading";

const BASE_URL = import.meta.env.VITE_BASE_URL;
export const AnticipatedGames = () => {
  const { data, isLoading } = useFetch(`${BASE_URL}/games/latest/anticipated`);


  return isLoading ? (
    <Loading />
  ) : (
    <ul>
      {data.map((game) => (
        <ReleasedList
          key={game.id}
          coverUrl={game.cover.url}
          gameName={game.name}
          releaseDate={game.first_release_date}
          slug={game.slug}
        />
      ))}
    </ul>
  );
};
