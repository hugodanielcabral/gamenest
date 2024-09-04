import getImageUrl from "../../../../utils/getImageUrl";
import { FaXbox, FaWindows } from "react-icons/fa";
import {
  SiPlaystation2,
  SiPlaystation3,
  SiPlaystation4,
  SiPlaystation5,
  SiStadia,
} from "react-icons/si";
import { CollectionButton } from "../../../CollectionButton";
import { Button } from "../../../ui/button/Button.tsx";

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

const platformsIcons = {
  "Xbox One": <FaXbox className="size-6 text-white" />,
  "Xbox Series X": <FaXbox className="size-6 text-white" />,
  "Xbox Series S": <FaXbox className="size-6 text-white" />,
  "Xbox 360": <FaXbox className="size-6 text-white" />,
  Xbox: <FaXbox className="size-6 text-white" />,
  "PC (Microsoft Windows)": <FaWindows className="size-6 text-white" />,
  "PlayStation 2": <SiPlaystation2 className="size-6 text-white" />,
  "PlayStation 3": <SiPlaystation3 className="size-6 text-white" />,
  "PlayStation 4": <SiPlaystation4 className="size-6 text-white" />,
  "PlayStation 5": <SiPlaystation5 className="size-6 text-white" />,
  "Google Stadia": <SiStadia className="size-6 text-white" />,
};

export const GameDetailsHeader = ({
  gameDetail,
  gameSlug,
}: GameDetailsHeaderProps) => {

  //! 1. Buscar una forma mejor de manejar los iconos, ya sea por medio de una biblioteca(iconify) o por medio de un componente
    //! 2. Refactorizar el useCheckGameInCollection para que sea mas limpio y este en TS.
    //! 3. Refactorizar el componente Button.
    //! 4. Hacer lo mismo que hice con CollectionButton pero para los rating.

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
      <div className="z-10 mb-10 space-y-4 self-end">
        <div className="flex gap-2">
          {gameDetail?.platforms.map((platform) => (
            <span
              key={platform.id}
              className="tooltip tooltip-top text-pretty"
              data-tip={platform.name}
            >
              {platformsIcons[platform.name] || platform.abbreviation}
            </span>
          ))}
        </div>
        <h1 className="text-pretty text-3xl font-bold text-info">
          {gameDetail?.name}
        </h1>
       <CollectionButton gameSlug={gameSlug} />
      </div>
    </section>
  );
};
