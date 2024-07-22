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
    <div className="hidden gap-3 md:flex">
      {isAuth
        ? privateRoutes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className={clsx(
                {
                  "text-white underline decoration-info decoration-solid decoration-4 underline-offset-8":
                    pathname === route.path,
                },
                "text-base font-bold uppercase text-gray-400 hover:text-gray-500 md:text-base lg:text-lg",
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
                  "text-white underline decoration-info decoration-solid decoration-4 underline-offset-8":
                    pathname === route.path,
                },
                "text-base font-bold uppercase text-gray-400 hover:text-gray-500 md:text-base lg:text-lg",
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
    }),
  ).isRequired,
  publicRoutes: propTypes.arrayOf(
    propTypes.shape({
      name: propTypes.string.isRequired,
      path: propTypes.string.isRequired,
    }),
  ).isRequired,
  pathname: propTypes.string.isRequired,
};
