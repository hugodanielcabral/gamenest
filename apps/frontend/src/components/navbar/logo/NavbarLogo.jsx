import { Link } from "react-router-dom";
import gameNestLogo1 from "../../../assets/logos/gamenest-logo-1.webp";

export const NavbarLogo = () => {
  return (
    <>
      <Link to="/">
        <img
          src={gameNestLogo1}
          alt="Logo of GameNest"
          className="w-14 h-8 md:w-16 md:10 object-cover object-center cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
        />
      </Link>
    </>
  );
};
