import heroImageNC from "../../../../assets/backgrounds/hero-image-home-not-connected.avif";
import "./HomeHeader.css";
import { Button } from "../../../ui/index.js";

export const HomeHeader = () => {
  return (
    <header className="hero">
      <div className="container">
        <img src={heroImageNC} alt="" className="hero-image" />
        <div className="hero-description">
          <h1 className="hero-title text-xl md:text-3xl lg:text-5xl text-center text-white mb-1">
            All your <span className="text-info">games</span> in one place
          </h1>
          <p className="hero-subtitle text-gray-300 text-sm md:text-xl lg:text-2xl">
            Join us and track all your games
          </p>
          <Button
            to="/signup"
            className="hero-button text-sm md:text-base lg:text-lg"
          >
            Sign up
          </Button>
        </div>
      </div>
    </header>
  );
};
