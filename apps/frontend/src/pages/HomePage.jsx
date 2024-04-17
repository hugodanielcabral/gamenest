import { HomeHeader } from "../components/home/header/HomeHeader";
import { HomeNextGame } from "../components/home/nextGame/HomeNextGame";
import { HomeCustomize } from "../components/home/notConnected/customize/HomeCustomize";

const HomePage = () => {
  return (
    <>
      <HomeHeader />
      <HomeNextGame />
      <HomeCustomize />
    </>
  );
};

export default HomePage;
