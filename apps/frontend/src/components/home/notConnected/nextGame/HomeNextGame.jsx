import gamesPageImage from "../../../../assets/backgrounds/games-page.avif";
import "./HomeNextGame.css";
export const HomeNextGame = () => {
  return (
    <>
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold  uppercase mb-10 text-center mt-10 bg-clip-text text-transparent bg-gradient-to-r from-info to-error">
        Find your next game
      </h2>
      <img src={gamesPageImage} alt="" className="next-game-image" />
    </>
  );
};
