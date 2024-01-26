import { HeaderCarousel } from "./carousel/HeaderCarousel";
import { HeaderNav } from "./nav/HeaderNav";

export const Header = () => {
  return (
    <div className="relative">
      <HeaderNav />
      <HeaderCarousel />
    </div>
  );
};
