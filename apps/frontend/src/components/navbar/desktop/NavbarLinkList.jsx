import propTypes from "prop-types";
import { Link } from "react-router-dom";
import clsx from "clsx";

export const NavbarLinkList = ({
  isAuth,
  privateRoutes,
  publicRoutes,
  pathname,
}) => {
  return (
    <div className="gap-3 hidden md:flex">
      {isAuth
        ? privateRoutes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className={clsx(
                {
                  "decoration-info underline decoration-solid decoration-4 underline-offset-8 text-white":
                    pathname === route.path,
                },
                "uppercase font-bold md:text-base text-base lg:text-lg text-gray-400 hover:text-gray-500"
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
                  "decoration-info underline decoration-solid decoration-4 underline-offset-8 text-white":
                    pathname === route.path,
                },
                "uppercase font-bold md:text-base text-base lg:text-lg text-gray-400 hover:text-gray-500"
              )}
            >
              {route.name}
            </Link>
          ))}
    </div>
  );
};

NavbarLinkList.propTypes = {
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
