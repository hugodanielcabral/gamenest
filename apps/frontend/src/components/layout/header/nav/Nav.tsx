import { useAuth } from "../../../../context/AuthContext";
import { Link } from "react-router-dom";
import { NavLogo } from "./logo/NavLogo";
import { NavLink } from "./link/NavLink";
import { privateRoutes, authRoutes, publicRoutes } from "./navigation";
import { IoMdMenu } from "react-icons/io";
import { FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import gameNestLogo1 from "../../../../assets/logos/gamenest-logo-1.webp";

export const Nav = () => {
  const { isAuth, signout } = useAuth();

  return (
      <nav className="navbar flex justify-between bg-base-100 bg-opacity-75 px-4 backdrop-blur-md">
        <NavLogo imgSrc={gameNestLogo1} />
        {/* Links */}
        <div className="w-[50%] flex-none place-content-center">
          {/* Desktop */}
          <ul className="menu menu-horizontal hidden px-1 md:flex">
            {isAuth
              ? privateRoutes.map((route) => (
                  <NavLink key={route.path} route={route} />
                ))
              : publicRoutes.map((route) => (
                  <NavLink key={route.path} route={route} />
                ))}
          </ul>
          {/* Mobile */}
          <div className="dropdown dropdown-bottom block md:hidden z-50">
            <div tabIndex={0} role="button" className="m-1">
              <IoMdMenu className="size text-2xl" />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] w-fit rounded-box bg-base-100 p-2 shadow"
            >
              {isAuth
                ? privateRoutes.map((route) => (
                    <NavLink key={route.path} route={route} />
                  ))
                : publicRoutes.map((route) => (
                    <NavLink key={route.path} route={route} />
                  ))}
            </ul>
          </div>
        </div>

        {/* Singin and Logount */}

        <div className="w-[25%] flex-none place-content-end md:flex">
          {isAuth ? (
            <button
              onClick={() => signout()}
              className="text-sm text-error hover:text-opacity-75 md:text-lg"
            >
              <FaSignOutAlt className="mr-2 inline" size={28} />
              <span className="hidden md:inline">Cerrar sesión</span>
            </button>
          ) : (
            authRoutes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className="text-sm text-info hover:text-opacity-75 md:text-lg"
              >
                <FaSignInAlt className="mr-2 inline" size={28} />
                <span className="hidden md:inline">Iniciar sesión</span>
              </Link>
            ))
          )}
        </div>
      </nav>
  );
};
