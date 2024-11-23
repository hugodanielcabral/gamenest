import { DateTime } from "luxon";
import { useDataFetch } from "../../../hooks/useDataFetch";
import { Loading } from "../../ui/loading/Loading.tsx";
import { Link } from "react-router-dom";
import getImageUrl from "../../../utils/getImageUrl";
import { useEffect, useState } from "react";

interface HomeAnticipatedProps {
  fetchData: {
    id: number;
    name: string;
    cover: {
      id: number;
      url: string;
    };
    slug: string;
    first_release_date: number;
  }[];
}

export const HomeAnticipated = () => {
  const { fetchData, isLoading } = useDataFetch<
    HomeAnticipatedProps["fetchData"]
  >(`games/latest/anticipated`);

  const [countdowns, setCountdowns] = useState<
    { id: number; days: number; hours: number; minutes: number }[]
  >([]);

  useEffect(() => {
    if (fetchData && fetchData.length > 0) {
      const calculateCountdowns = () => {
        const now = DateTime.now();
        const newCountdowns = fetchData.map((game) => {
          const releaseDate = DateTime.fromMillis(
            game.first_release_date * 1000,
          );
          const diff = releaseDate.diff(now, ["days", "hours", "minutes"]);
          return {
            id: game.id,
            days: Math.floor(diff.days),
            hours: Math.floor(diff.hours),
            minutes: Math.floor(diff.minutes),
          };
        });
        setCountdowns(newCountdowns);
      };

      calculateCountdowns();
      const interval = setInterval(calculateCountdowns, 60000);

      return () => clearInterval(interval);
    }
  }, [fetchData]);

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
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">
      <h2 className="col-span-full mb-2 font-nunito text-xl text-white md:text-2xl lg:text-3xl">
        Más anticipados
      </h2>
      {fetchData && fetchData.length > 0 ? (
        fetchData.map((game) => {
          const countdown = countdowns.find((c) => c.id === game.id);
          return (
            <Link
              key={game.id}
              to={`/games/${game?.slug}`}
              className="group relative h-[200px] w-full sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]"
            >
              <img
                src={getImageUrl(game?.cover?.url, "cover_big_2x")}
                alt={`${game?.name} cover image`}
                className="absolute h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-70 transition-opacity group-hover:opacity-60"></div>
              <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
                <h3 className="line-clamp-2 text-pretty text-xs font-bold text-white sm:text-base">
                  {game?.name}
                </h3>
                {countdown && (
                  <p className="text-xs text-white sm:text-sm md:text-base">
                    {countdown.days}d {countdown.hours}h {countdown.minutes}m
                  </p>
                )}
              </div>
            </Link>
          );
        })
      ) : (
        <div className="col-span-full flex min-h-screen justify-center">
          <p className="mt-10 text-pretty text-center font-nunito text-lg text-white sm:text-2xl md:text-3xl lg:text-4xl">
            No se encontraron los juegos más anticipados.
          </p>
        </div>
      )}
    </div>
  );
};
