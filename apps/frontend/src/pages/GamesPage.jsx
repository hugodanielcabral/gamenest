import { FiltersMobile } from "../components/games/gameshome/filters/mobile/FiltersMobile.jsx";
import {
  GamesFilters,
  GamesHome,
} from "../components/games/gameshome/index.js";
import { HeaderHero } from "../components/layout/header/hero/HeaderHero.jsx";
import { heroInfo } from "../data/heroInfo.js";
import { useFetchGames } from "../hooks/useFetchGames.js";

const GamesPage = () => {
  const gamesHeroInfo = heroInfo.find((hero) => hero.title === "Games");
  const { isLoading } = useFetchGames();

  return (
    <>
      <div className="w-full">
        <HeaderHero heroInfo={gamesHeroInfo} />
      </div>
      <div className="grid grid-cols-4 gap-4 p-5">
        <div className="col-span-4 lg:col-span-3">
          <GamesHome />
        </div>
        <aside className="sticky hidden bg-transparent lg:block top-24 h-fit border-base-content">
          <GamesFilters />
        </aside>
        {isLoading ? null : <FiltersMobile />}
      </div>
    </>
  );
};

export default GamesPage;
