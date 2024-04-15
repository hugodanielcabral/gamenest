import { useFetch } from "../../../hooks/useFetch.js";
import { Loading } from "../../ui/index.js";
import { BackgroundImage } from "../../ui/backgroundImage/backgroundImage";
import backgroundImage from "../../../assets/backgrounds/games-finder-wallpaper.webp";
import { GamesFinderCard } from "./card/GamesFinderCard";
import { GamesFinderSearch } from "./search/GamesFinderSearch.jsx";
import { NoData } from "../../notfound/NoData.jsx";
import { GamesFinderPagination } from "./pagination/GamesFinderPagination.jsx";
import { GamesFinderFilters } from "./filters/GamesFinderFilters.jsx";
import { Drawer } from "../../ui/drawer/Drawer.jsx";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const GamesFinder = () => {
  const { games, currentPage, totalPages, isLoading, error } = useFetch(
    `${BASE_URL}/games`
  );

  return (
    <BackgroundImage backgroundImage={backgroundImage}>
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-4">
          <GamesFinderSearch />
        </div>
        <div className="col-span-4 md:hidden block mx-auto">
          <Drawer btnTitle="Filters">
            <GamesFinderFilters />
          </Drawer>
        </div>
        <div className="p-4 rounded shadow col-span-4 flex flex-col gap-5 md:col-span-3 mx-auto">
          {isLoading ? (
            <Loading />
          ) : games?.length ? (
            games.map((game) => <GamesFinderCard game={game} key={game.id} />)
          ) : (
            <NoData
              className="p-5 bg-base-100/90 text-center w-96"
              message={error?.statusText || "No games found"}
            />
          )}
        </div>
        <div className="p-4 col-span-4 md:col-span-1 md:block hidden">
          <GamesFinderFilters />
        </div>
        <div className={`col-span-4 p-4 mx-auto`}>
          <GamesFinderPagination
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
      </div>
    </BackgroundImage>
  );
};
