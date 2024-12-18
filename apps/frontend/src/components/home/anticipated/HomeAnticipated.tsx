import { DateTime } from "luxon";
import { useDataFetch } from "../../../hooks/useDataFetch";
import { Loading } from "../../ui/loading/Loading.tsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IGDBGamesProps } from "../../../types/igdbGames.ts";
import getImageUrl from "../../../utils/getImageUrl";

export const TimeDisplay = ({ time, text }: { time: number; text: string }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="rounded-md bg-gray-700 bg-opacity-75 p-1 text-5xl text-white">
        {time.toString().padStart(2, "0")}
      </span>
      <span className="text-white">{text}</span>
    </div>
  );
};

interface Countdown {
  id: number;
  days: number;
  hours: number;
  minutes: number;
}

const CountdownDisplay = ({
  countdown,
  releaseDate,
}: {
  countdown: Countdown;
  releaseDate: number;
}) => {
  const isReleased = releaseDate * 1000 <= DateTime.now().toMillis();
  return (
    <div className="flex gap-2">
      {isReleased ? (
        <p className="text-sm font-bold text-orange-400 md:text-lg lg:text-xl">
          ¡JUEGO LANZADO!
        </p>
      ) : (
        <>
          <TimeDisplay time={countdown.days} text="DÍAS" />
          <TimeDisplay time={countdown.hours} text="HORAS" />
          <TimeDisplay time={countdown.minutes} text="MINUTOS" />
        </>
      )}
    </div>
  );
};

const GameCard = ({
  game,
  countdown,
}: {
  game: IGDBGamesProps;
  countdown: Countdown | undefined;
}) => {
  return (
    <Link
      key={game.id}
      to={`/games/${game?.slug}`}
      className="group relative h-[200px] w-full sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]"
    >
      <img
        src={getImageUrl(game?.cover?.url, "cover_big_2x")}
        alt={`${game?.name} cover image`}
        className="absolute h-full w-full rounded-md object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-70 transition-opacity group-hover:opacity-60"></div>
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-4">
        <h3 className="line-clamp-2 text-pretty text-sm font-bold text-white sm:text-base md:text-lg lg:text-xl">
          {game?.name}
        </h3>
        {game?.first_release_date && (
          <div className="text-sm text-white sm:text-base md:text-lg lg:text-xl">
            {DateTime.fromMillis(game.first_release_date * 1000)
              .setLocale("es-AR")
              .toLocaleString(DateTime.DATE_FULL)}
          </div>
        )}
        {countdown && (
          <CountdownDisplay
            countdown={countdown}
            releaseDate={game.first_release_date}
          />
        )}
      </div>
    </Link>
  );
};

export const HomeAnticipated = () => {
  const { fetchData, isLoading } = useDataFetch<IGDBGamesProps[]>(
    `games/latest/anticipated`,
  );

  const [countdowns, setCountdowns] = useState<Countdown[]>([]);

  const INTERVAL_TIME = 60000;

  useEffect(() => {
    if (fetchData && fetchData.length > 0) {
      const calculateCountdowns = () => {
        const now = DateTime.now();
        const newCountdowns = fetchData.map((game) => {
          const releaseDate = DateTime.fromMillis(
            game?.first_release_date * 1000,
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
      const interval = setInterval(calculateCountdowns, INTERVAL_TIME);

      return () => clearInterval(interval);
    }
  }, [fetchData]);

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
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">
      <h2 className="col-span-full mb-2 font-nunito text-xl text-white md:text-2xl lg:text-3xl">
        Más anticipados
      </h2>
      {fetchData && fetchData.length > 0 ? (
        fetchData
          .sort((a, b) => a.first_release_date - b.first_release_date)
          .map((game) => {
            const countdown = countdowns.find((c) => c.id === game.id);
            return <GameCard key={game.id} game={game} countdown={countdown} />;
          })
      ) : (
        <div className="col-span-full flex justify-center">
          <p className="text-pretty font-nunito text-sm italic text-gray-300 sm:text-lg md:text-xl lg:text-2xl">
            No hay juegos anticipados disponibles en este momento.
          </p>
        </div>
      )}
    </div>
  );
};