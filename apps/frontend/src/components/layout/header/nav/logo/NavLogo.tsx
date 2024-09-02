import { Link } from "react-router-dom";

interface NavLogoProps {
  imgSrc: string;
}

export const NavLogo = ({ imgSrc }: NavLogoProps) => {
  return (
    <Link to="/" className="w-[25%]">
      <img
        src={imgSrc}
        alt="Logo de GameNest"
        className="h-6 transition-transform duration-300 ease-in-out hover:scale-105 md:h-8"
      />
    </Link>
  );
};
