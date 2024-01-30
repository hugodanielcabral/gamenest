import { GamesHome } from "../../src/components/games/gameshome/GamesHome.jsx";

export const GamesPage = () => {
  return (
    <>
      <div className="grid-cols-2 col-span-4 lg:col-span-3">
        <GamesHome />
      </div>
      <aside className="hidden lg:block bg-white-color">
        <h3 className="font-bold text-red-color">GAMES FILTERS</h3>
      </aside>
    </>
  );
};
