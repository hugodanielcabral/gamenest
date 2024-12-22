import type { GameDetailsContentProps } from "../../../../types/gameDetails";
import { platformsIcons } from "../../../../data/platformsIcons";
import { CollectionButton } from "../../../CollectionButton";
import { Icon } from "../../../ui/icon/Icon";
import { DateTime, Duration } from "luxon";
import { useDataFetch } from "../../../../hooks/useDataFetch";
import { IGDBTimeToBeat } from "../../../../types/igdbGames";
import gameDetailsBackground from "../../../../assets/backgrounds/gamesdetails-background.webp";
import getImageUrl from "../../../../utils/getImageUrl";
import clsx from "clsx";

const TimeDisplay = ({ time, text }: { time: number; text: string }) => {
  return (
    <div className="flex min-w-52 items-center gap-2 rounded-lg bg-base-100 p-1 shadow-md shadow-black md:p-2">
      <h2 className="font-nunito text-sm font-bold text-white md:text-lg">
        {text}:
      </h2>
      <span className="font-nunito text-sm font-bold text-gray-300 md:text-lg">
        {time ? Duration.fromMillis(time * 1000).toFormat("h") + " HS" : "S/D"}
      </span>
    </div>
  );
};

export const GameDetailsHeader = ({
  gameDetail,
  gameSlug,
}: GameDetailsContentProps) => {
  const { fetchData: timeToBeat } = useDataFetch<IGDBTimeToBeat>(
    `timetobeat/${gameDetail?.id}`,
  );

  const headerBackground =
    gameDetail?.screenshots && gameDetail.screenshots.length > 0
      ? getImageUrl(gameDetail.screenshots[0].url)
      : gameDetailsBackground;

  return (
    <section className="relative flex flex-col gap-4 p-4 lg:flex-row">
      <img
        src={headerBackground}
        alt={`Cover del juego "${gameDetail.name}"`}
        className="absolute left-0 top-0 z-0 h-full w-full bg-center object-cover opacity-20 blur-md"
      />
      <div className="relative z-10 h-full w-64 self-center rounded-md shadow-md shadow-black">
        <img
          src={getImageUrl(gameDetail?.cover?.url, "cover_big_2x")}
          alt={`Cover del juego "${gameDetail.name}"`}
          className="rounded-md"
        />
        <div
          className="tooltip tooltip-left md:tooltip-right absolute right-0 top-0 rounded-bl-full bg-base-300 bg-opacity-90 p-5 sm:p-6"
          data-tip="Calificación IGDB."
        >
          <Icon
            name="icon-[ion--trophy-sharp] text-warning"
            className="absolute right-1 top-1"
          />
          <span
            className={clsx("text-lg font-bold", {
              "text-red-500": gameDetail?.rating < 40,
              "text-orange-800":
                gameDetail?.rating >= 40 && gameDetail?.rating < 60,
              "text-green-500":
                gameDetail?.rating >= 60 && gameDetail?.rating < 80,
              "text-yellow-500":
                gameDetail?.rating >= 80 && gameDetail?.rating < 90,
              "text-teal-400": gameDetail?.rating >= 90,
            })}
          >
            {Math.floor(gameDetail?.rating)}
          </span>
        </div>
      </div>

      <div className="z-10 space-y-4 self-center lg:self-end">
        {gameDetail?.platforms && gameDetail?.platforms.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {gameDetail.platforms.map((platform) => (
              <span
                key={platform.id}
                className="tooltip tooltip-top text-pretty"
                data-tip={platform.name}
              >
                <Icon
                  name={platformsIcons[platform.name] || "icon-[mdi--gamepad]"}
                  className="size-6 text-gray-300 hover:text-gray-400 md:size-8"
                />
              </span>
            ))}
          </div>
        )}
        <h1 className="text-pretty text-center text-base text-white sm:text-lg md:text-left md:text-2xl lg:text-3xl xl:text-4xl">
          {gameDetail?.name} (
          <span>
            {DateTime.fromMillis(gameDetail?.first_release_date * 1000).year}
          </span>
          )
        </h1>
        <div className="flex justify-center gap-2 lg:justify-start">
          <CollectionButton gameSlug={gameSlug} />
        </div>
      </div>

      <div className="flex-grow self-center justify-self-end lg:self-end">
        <div className="item-center flex flex-col gap-2 lg:items-end">
          <span className="flex items-center gap-2">
            <Icon
              name="icon-[mdi--clock]"
              className="size-4 text-yellow-500 md:size-6"
            />
            <h2 className="font-nunito text-sm text-yellow-500 md:text-lg">
              Tiempo para completar
            </h2>
          </span>
          <TimeDisplay time={timeToBeat?.hastily} text={"Rápido"} />
          <TimeDisplay time={timeToBeat?.normally} text={"Normal"} />
          <TimeDisplay time={timeToBeat?.completely} text={"Al 100%"} />
        </div>
      </div>
    </section>
  );
};
