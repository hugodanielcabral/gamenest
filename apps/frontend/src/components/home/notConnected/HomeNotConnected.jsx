import { HomeComingSoon } from "../comingSoon/HomeComingSoon";
import { HomeCollection } from "./collection/HomeCollection";
import { HomeCustomize } from "./customize/HomeCustomize";
import { HomeHeader } from "./header/HomeHeader";
import { HomeNextGame } from "./nextGame/HomeNextGame";

export const HomeNotConnected = () => {
  return (
    <div className="bg-base-100/90">
      <HomeHeader />
      <HomeNextGame />
      <HomeCustomize />
      <HomeCollection />
      <HomeComingSoon />
    </div>
  );
};
