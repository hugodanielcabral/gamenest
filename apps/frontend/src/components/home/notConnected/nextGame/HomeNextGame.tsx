import gamesPageImage from "../../../../assets/backgrounds/games-page.avif";
import "./HomeNextGame.css";
export const HomeNextGame = () => {
  return (
    <section>
      <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold uppercase text-center mt-10 bg-clip-text text-transparent bg-gradient-to-r from-info to-error">
        Encuentra tu próximo juego
      </h2>
      <p className="text-base md:text-xl lg:text-2xl text-balance text-center text-gray-300">
       Explora nuestra colección de juegos y encuentra tu próximo favorito
      </p>
      <img src={gamesPageImage} alt="Imagen de la página Juegos" className="next-game-image mt-5" />
    </section>
  );
};
