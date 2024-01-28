import { useLocation } from "react-router-dom";
import { HeaderCarousel } from "./carousel/HeaderCarousel";
import { HeaderNav } from "./nav/HeaderNav";
import { HeaderHero } from "./hero/HeaderHero";
export const Header = () => {
  const location = useLocation();
  const { pathname } = location;
  console.log(pathname);
  return (
    <div className="">
      <HeaderNav pathname={pathname} />
      {/*//!Hacer un ternario para que si esta en la ruta / se renderize el carousel */}
      {pathname === "/" ? <HeaderCarousel /> : <HeaderHero />}
    </div>
  );
};
