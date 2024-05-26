import propTypes from "prop-types";
import { Link } from "react-router-dom";

export const NavbarUserSettings = ({ user, isAuth, authRoutes, signout }) => {
  return (
    <div>
      {!isAuth ? (
        <div className="gap-3 flex md:flex-row flex-col items-center justify-center">
          {authRoutes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className="uppercase font-bold md:text-base text-sm lg:text-lg text-error hover:text-error/80"
            >
              {route.name}
            </Link>
          ))}
        </div>
      ) : (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar size-12 md:size-20 hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <div className="rounded-full border-2 border-t-error border-x-info border-y-error size-12 md:size-20 hover:border-y-info hover:border-x-error transition-all duration-500 ease-in-out ">
              <img alt="User Profile Picture" src={user?.avatar} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-base-100 rounded-box w-52 gap-2"
          >
            <Link
              to="/profile"
              className="uppercase font-bold md:text-base text-base lg:text-lg text-white"
            >
              Perfil
            </Link>
            <Link
              to="/settings"
              className="uppercase font-bold md:text-base text-base lg:text-lg text-white"
            >
              Configuración
            </Link>
            <button
              onClick={signout}
              className="self-start uppercase font-bold md:text-base text-base lg:text-lg text-error"
            >
              Cerrar sesión
            </button>
          </ul>
        </div>
      )}
    </div>
  );
};

NavbarUserSettings.propTypes = {
  isAuth: propTypes.bool.isRequired,
  authRoutes: propTypes.arrayOf(
    propTypes.shape({
      name: propTypes.string.isRequired,
      path: propTypes.string.isRequired,
    })
  ).isRequired,
  signout: propTypes.func.isRequired,
  user: propTypes.object.isRequired,
};
