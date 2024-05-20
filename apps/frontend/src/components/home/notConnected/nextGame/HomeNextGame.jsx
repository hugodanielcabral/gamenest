import gamesPageImage from "../../../../assets/backgrounds/games-page.avif";
import "./HomeNextGame.css";
export const HomeNextGame = () => {
  return (
    <section>
      <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold uppercase text-center mt-10 bg-clip-text text-transparent bg-gradient-to-r from-info to-error">
        Find your next game
      </h2>
      <p className="text-base md:text-xl lg:text-2xl text-balance text-center text-gray-300">
        Explore our collection of games and find your next game to play.
      </p>
      <img src={gamesPageImage} alt="" className="next-game-image mt-5" />
    </section>
  );
};
