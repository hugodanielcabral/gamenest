import type { GameProps } from "../../../../types/collectionManager";
import getImageUrl from "../../../../utils/getImageUrl";
import gameDetailsBackground from "../../../../assets/backgrounds/gamesdetails-background.webp";
import { useLocation } from "react-router-dom";


export const ManagerHeader = ({ game }: GameProps) => {

  const headerBackground =
    game?.screenshots && game.screenshots.length > 0
      ? getImageUrl(game?.screenshots[0].url)
      : gameDetailsBackground;

    const {pathname} = useLocation();

  return (
    <section className="relative flex flex-col gap-4 p-4 md:flex-row">
      <img
        src={headerBackground}
        alt={`Cover del juego "${game?.name}"`}
        className="absolute left-0 top-0 z-0 h-full w-full object-cover bg-center opacity-20 blur-md"
      />
      <img
        src={getImageUrl(getImageUrl(game?.cover?.url, "cover_big_2x"))}
        alt={`Cover del juego "${game?.name}"`}
        className="z-10 h-full w-64 self-center rounded-md shadow-md shadow-black"
      />
      <div className="z-10 self-center md:self-end">
        <h1 className="text-pretty text-base italic text-info text-opacity-90 md:text-lg lg:text-xl xl:text-2xl">
          {pathname.includes("/update/") ? "Actualizar" : "Agregar"} juego
        </h1>
        <h2 className="text-pretty text-xl text-white md:text-2xl lg:text-3xl xl:text-4xl">
          {game?.name}
        </h2>
      </div>
    </section>
  );
};
