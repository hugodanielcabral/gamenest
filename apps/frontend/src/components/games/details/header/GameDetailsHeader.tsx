import type { GameDetailsContentProps } from "../../../../types/gameDetails";
import { platformsIcons } from "../../../../data/platformsIcons";
import { CollectionButton } from "../../../CollectionButton";
import { Icon } from "../../../ui/icon/Icon";
import gameDetailsBackground from "../../../../assets/backgrounds/gamesdetails-background.webp"
import getImageUrl from "../../../../utils/getImageUrl";

export const GameDetailsHeader = ({
  gameDetail,
  gameSlug,
}: GameDetailsContentProps) => {


  const headerBackground = gameDetail?.screenshots && gameDetail.screenshots.length > 0 ? getImageUrl(gameDetail.screenshots[0].url) : gameDetailsBackground;

  return (
    <section className="relative flex flex-col gap-4 p-4 md:flex-row">
      <img
        src={headerBackground}
        alt={`Cover del juego "${gameDetail.name}"`}
        className="absolute left-0 top-0 z-0 h-full w-full object-cover opacity-45 blur-sm"
      />
      <img
        src={getImageUrl(getImageUrl(gameDetail.cover.url, "cover_big_2x"))}
        alt={`Cover del juego "${gameDetail.name}"`}
        className="z-10 h-full w-64 self-center rounded-md shadow-md shadow-black"
      />
      <div className="z-10 mb-10 space-y-4 self-center md:self-end">
        <div className="flex gap-2">
          {gameDetail?.platforms.map((platform) => (
            <span
              key={platform.id}
              className="tooltip tooltip-top text-pretty"
              data-tip={platform.name}
            >
              <Icon
                name={platformsIcons[platform.name]}
                className="size-6 text-gray-300 hover:text-gray-400 md:size-8"
              />
            </span>
          ))}
        </div>
        <h1 className="text-pretty text-xl text-white md:text-2xl lg:text-3xl xl:text-4xl">
          {gameDetail?.name}
        </h1>
        <CollectionButton gameSlug={gameSlug} />
      </div>
    </section>
  );
};
