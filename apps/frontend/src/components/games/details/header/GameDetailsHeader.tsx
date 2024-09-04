import { platformsIcons } from "../../../../data/platformsIcons";
import getImageUrl from "../../../../utils/getImageUrl";
import { CollectionButton } from "../../../CollectionButton";
import { Icon } from "../../../ui/icon/Icon";

interface GameDetailsHeaderProps {
  gameDetail: {
    id: number;
    name: string;
    cover: { id: number; url: string };
    platforms: { id: number; abbreviation: string; name: string }[];
    screenshots: { id: number; url: string }[];
  };
  gameSlug: string;
}

export const GameDetailsHeader = ({
  gameDetail,
  gameSlug,
}: GameDetailsHeaderProps) => {



  return (
    <section className="relative flex flex-col gap-4 p-4 md:flex-row">
      <img
        src={getImageUrl(
          getImageUrl(gameDetail.screenshots[0].url, "cover_big_2x"),
        )}
        alt={`Cover del juego "${gameDetail.name}"`}
        className="absolute left-0 top-0 z-0 h-full w-full object-cover opacity-45 blur-sm"
      />
      <img
        src={getImageUrl(getImageUrl(gameDetail.cover.url, "cover_big_2x"))}
        alt={`Cover del juego "${gameDetail.name}"`}
        className="z-10 h-full w-64 self-center rounded-md shadow-md shadow-black"
      />
      <div className="z-10 mb-10 space-y-4 self-center  md:self-end">
        <div className="flex gap-2">
          {gameDetail?.platforms.map((platform) => (
            <span
              key={platform.id}
              className="tooltip tooltip-top text-pretty"
              data-tip={platform.name}
            >
              <Icon name={platformsIcons[platform.name]} className="size-6 md:size-8 hover:text-gray-300 text-gray-400" />
            </span>
          ))}
        </div>
        <h1 className="text-pretty text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white">
          {gameDetail?.name}
        </h1>
       <CollectionButton gameSlug={gameSlug} />
      </div>
    </section>
  );
};
