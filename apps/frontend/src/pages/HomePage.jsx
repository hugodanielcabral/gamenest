import { HomeComingSoon } from "../components/home/comingSoon/HomeComingSoon";
import { HomeHeader } from "../components/home/header/HomeHeader";
import { HomeNextGame } from "../components/home/nextGame/HomeNextGame";
import { HomeCollection } from "../components/home/notConnected/collection/HomeCollection";
import { HomeCustomize } from "../components/home/notConnected/customize/HomeCustomize";

const HomePage = () => {
  return (
    <>
      <HomeHeader />
      <HomeNextGame />
      <HomeCustomize />
      <HomeCollection />
      <HomeComingSoon />
    </>
  );
};

export default HomePage;
