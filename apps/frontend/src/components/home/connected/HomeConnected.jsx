import { BackgroundImage } from "../../ui/backgroundImage/backgroundImage";
import { HomeLatestGames } from "./latests/HomeLatestGames";
import { HomePopularGames } from "./popular/HomePopularGames";
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
