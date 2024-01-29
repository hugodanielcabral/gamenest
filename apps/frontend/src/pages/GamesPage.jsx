import { GamesHomeCard } from "../components/games/gameshome/card/GamesHomeCard.jsx";

export const GamesPage = () => {
  return (
    <>
      <div className="grid-cols-2 col-span-3">
        <GamesHomeCard />
      </div>
      <aside>
        <h3 className="font-bold text-red_color">GAMES FILTERS</h3>
      </aside>
    </>
  );
};
