import { useFetch } from "../../../../../hooks/useFetch";
import { ReleasedList } from "../list/ReleasedList";
import { Loading } from "../../../../ui/loading/Loading";

const BASE_URL = import.meta.env.VITE_BASE_URL;
export const UpComingGames = () => {
  const { data = [], isLoading = true} = useFetch(`${BASE_URL}/games/latest/upcoming`);

  return isLoading ? (
    <div className="mt-10 self-center">
      <Loading />
    </div>
  ) : (
    <>
      {data?.slice(0,6).map((game) => (
        <ReleasedList
          key={game.id}
          coverUrl={game?.cover.url}
          gameName={game?.name}
          releaseDate={game?.first_release_date}
          slug={game?.slug}
        />
      ))}
    </>
  );
};
