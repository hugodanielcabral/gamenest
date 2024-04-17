import heroImageNC from "../../../assets/backgrounds/hero-image-home-not-connected.avif";
import "./HomeHeader.css";
import { Button } from "../../ui/index.js";

export const HomeHeader = () => {
  return (
    <header className="hero">
      <div className="container">
        <img src={heroImageNC} alt="" className="hero-image" />
        <div className="hero-description">
          <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl text-center">
            All your games in one place
          </h1>
          <p className="hero-subtitle">Join us and track all your games</p>
          <Button to="/signup" className="hero-button">
            Sign up
          </Button>
        </div>
      </div>
    </header>
  );
};
