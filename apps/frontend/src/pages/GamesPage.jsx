import { GamesHome } from "../../src/components/games/gameshome/GamesHome.jsx";
import { GamesFilters } from "../components/games/gameshome/filters/GamesFilters.jsx";

export const GamesPage = () => {
  return (
    <>
      <div className="grid-cols-2 col-span-4 lg:col-span-3">
        <GamesHome />
      </div>
      <aside className="sticky top-0 hidden bg-transparent border h-fit lg:block border-base-content border-opacity-20">
        <GamesFilters />
      </aside>
    </>
  );
};
