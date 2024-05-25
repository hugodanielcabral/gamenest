import heroImageNC from "../../../../assets/backgrounds/hero-image-home-not-connected.avif";
import "./HomeHeader.css";
import { Button } from "../../../ui/index.js";
import { useNavigate } from "react-router-dom";

export const HomeHeader = () => {
  const navigate = useNavigate();
  return (
    <header className="hero">
      <div className="container">
        <img src={heroImageNC} alt="" className="hero-image" />
        <div className="hero-description">
          <h1 className="hero-title text-xl md:text-3xl lg:text-5xl text-center text-white mb-1">
            Todos tus <span className="text-info">juegos</span> en un solo lugar
          </h1>
          <p className="hero-subtitle text-gray-300 text-sm md:text-xl lg:text-2xl">
            Unete y haz un seguimiento de tus juegos favoritos
          </p>
          <Button
            onClick={() => navigate("/register")}
            className="hero-button text-sm md:text-base lg:text-lg"
          >
            Registrate
          </Button>
        </div>
      </div>
    </header>
  );
};
