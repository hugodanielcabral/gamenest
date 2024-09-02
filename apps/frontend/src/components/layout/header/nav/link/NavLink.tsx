import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

interface NavLinkProps {
  route: { path: string; name: string };
}

export const NavLink = ({ route }: NavLinkProps) => {
  const { pathname } = useLocation();

  return (
    <li>
      <Link
        to={route.path}
        className={clsx("text-lg text-gray-300 hover:text-opacity-65", {
          "font-bold text-info": pathname === route.path,
        })}
      >
        {route.name}
      </Link>
    </li>
  );
};
