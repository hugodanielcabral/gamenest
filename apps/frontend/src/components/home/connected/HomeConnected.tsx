import { BackgroundImage } from "../../ui/backgroundImage/BackgroundImage.jsx";
import { HomeLatestGames } from "./latests/HomeLatestGames.tsx";
import { HomePopularGames } from "./popular/HomePopularGames.jsx";
import homeLatestGamesBg from "../../../assets/backgrounds/home-connected-latest-games.webp";

export const HomeConnected = () => {
  return (
    <>
      <BackgroundImage backgroundImage={homeLatestGamesBg}>
        <HomeLatestGames />
      </BackgroundImage>

      <HomePopularGames />
    </>
  );
};
