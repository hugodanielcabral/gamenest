import {
  GamesFilters,
  GamesFiltersDrawer,
  GamesHome,
} from "../components/games/gameshome/index.js";
import { HeaderHero } from "../components/layout/header/hero/HeaderHero.jsx";
import { heroInfo } from "../data/heroInfo.js";

export const GamesPage = () => {
  const gamesHeroInfo = heroInfo.find((hero) => hero.title === "Games");

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
        {/* The component "GamesFiltersDrawer" is the mobile version of GamesFilters */}
        <GamesFiltersDrawer>
          <GamesFilters />
        </GamesFiltersDrawer>
      </div>
    </>
  );
};
