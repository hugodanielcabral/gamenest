import backgroundImage from "../../../assets/backgrounds/games-finder-wallpaper.webp";
import { useFetchGames } from "../../../hooks/useFetchGames";
import { BackgroundImage } from "../../ui/backgroundImage/backgroundImage";
import { CardBackground } from "../../ui/cardBackground/CardBackground";
import { GamesFinderCard } from "./card/GamesFinderCard";

export const GamesFinder = () => {
  //TODO 2: Crear un componente buscador generico para poder reutilizarlo en otras paginas(por ahora en Games y Collection).

  //TODO 4: Crear un componente Pagination para utilizarlo tanto en Games como en Collection.

  //TODO 5: Crear un componente Filters para utilizarlo tanto en Games como en Collection.

  //* Utilizar los colores info, error y white.
  const { gamesData, isLoading, currentPage, totalPages } = useFetchGames();

  console.log(gamesData);

  return (
    <BackgroundImage backgroundImage={backgroundImage}>
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-red-500 text-white p-4 rounded shadow col-span-4">
          Buscador
        </div>
        <div className="bg-blue-500 text-white p-4 rounded shadow col-span-4 flex flex-col gap-5 md:col-span-3">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <GamesFinderCard gamesData={gamesData} />
          )}
        </div>
        <div className="bg-green-500 text-white p-4 rounded shadow col-span-4 md:col-span-1">
          Filters
        </div>
        <div className="bg-gray-500 col-span-4 text-white p-4 rounded shadow">
          Pagination
        </div>
      </div>
    </BackgroundImage>
  );
};
