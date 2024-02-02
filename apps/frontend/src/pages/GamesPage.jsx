import { GamesHome } from "../../src/components/games/gameshome/GamesHome.jsx";

export const GamesPage = () => {
  return (
    <>
      <div className="grid-cols-2 col-span-4 lg:col-span-3">
        <GamesHome />
      </div>
      <aside className="hidden lg:block bg-base-300 border border-base-content border-opacity-20 max-h-[900px] sticky top-0">
        <h3 className="mt-5 font-bold text-center text-red-color">
          GAMES FILTERS
        </h3>
      </aside>
    </>
  );
};
