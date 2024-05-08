import propTypes from "prop-types";
import { Link } from "react-router-dom";
import clsx from "clsx";

export const NavbarLinkListDropdown = ({
  isAuth,
  privateRoutes,
  publicRoutes,
  pathname,
}) => {
  return (
    <div className="navbar-start md:hidden">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          {isAuth
            ? privateRoutes.map((route) => (
                <Link
                  key={route.path}
                  to={route.path}
                  className={clsx(
                    {
                      "text-gray-400": pathname !== route.path,
                      "text-white": pathname === route.path,
                    },
                    "uppercase font-bold md:text-base text-sm"
                  )}
                >
                  {route.name}
                </Link>
              ))
            : publicRoutes.map((route) => (
                <Link
                  key={route.path}
                  to={route.path}
                  className={clsx(
                    {
                      "text-gray-400": pathname !== route.path,
                      "text-white": pathname === route.path,
                    },
                    "uppercase font-bold md:text-base text-sm mt-1"
                  )}
                >
                  {route.name}
                </Link>
              ))}
        </ul>
      </div>
    </div>
  );
};

NavbarLinkListDropdown.propTypes = {
  isAuth: propTypes.bool.isRequired,
  privateRoutes: propTypes.arrayOf(
    propTypes.shape({
      name: propTypes.string.isRequired,
      path: propTypes.string.isRequired,
    })
  ).isRequired,
  publicRoutes: propTypes.arrayOf(
    propTypes.shape({
      name: propTypes.string.isRequired,
      path: propTypes.string.isRequired,
    })
  ).isRequired,
  pathname: propTypes.string.isRequired,
};
