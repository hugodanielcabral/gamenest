import {
  GamesFilters,
  GamesFiltersDrawer,
  GamesHome,
} from "../components/games/gameshome/index.js";

export const GamesPage = () => {
  return (
    <>
      <div className="grid-cols-2 col-span-4 lg:col-span-3">
        <GamesHome />
      </div>
      <aside className="sticky hidden bg-transparent border shadow-lg top-24 h-fit lg:block border-base-content border-opacity-20">
        <GamesFilters />
      </aside>
      <GamesFiltersDrawer>
        <GamesFilters />
      </GamesFiltersDrawer>
    </>
  );
};
