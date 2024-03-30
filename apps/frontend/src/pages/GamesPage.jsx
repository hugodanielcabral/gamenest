import {
  GamesFilters,
  GamesHome,
} from "../components/games/gameshome/index.js";

const GamesPage = () => {
  return (
    <>
      <div className="grid grid-cols-4 gap-4 p-5">
        <div className="col-span-4 lg:col-span-3">
          <GamesHome />
        </div>
        <aside className="sticky hidden bg-transparent lg:block top-24 h-fit border-base-content">
          <GamesFilters />
        </aside>
      </div>
    </>
  );
};

export default GamesPage;
