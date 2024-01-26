import { HeaderCarousel } from "./carousel/HeaderCarousel";
import { HeaderNav } from "./nav/HeaderNav";

export const Header = () => {
  return (
    <div className="relative">
      <HeaderNav />
      {/*//!Hacer un ternario para que si esta en la ruta / se renderize el carousel */}
      <HeaderCarousel />
    </div>
  );
};
