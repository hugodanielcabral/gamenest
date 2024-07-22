import propTypes from "prop-types";
import { Link } from "react-router-dom";

export const NavbarUserSettings = ({ user, isAuth, authRoutes, signout }) => {
  return (
    <div>
      {!isAuth ? (
        <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
          {authRoutes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className="text-sm font-bold uppercase text-error hover:text-error/80 md:text-base lg:text-lg"
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
            className="avatar btn btn-circle btn-ghost size-12 transition-transform duration-300 ease-in-out hover:scale-95 md:size-20"
          >
            <div className="size-12 rounded-full border-2 border-x-info border-y-error border-t-error transition-all duration-500 ease-in-out hover:border-x-error hover:border-y-info md:size-20">
              <img alt="User Profile Picture" src={user?.avatar} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 gap-2 rounded-box bg-base-100 p-3 shadow"
          >
            {/*  <Link
              to="/profile"
              className="text-base font-bold uppercase text-white md:text-base lg:text-lg"
            >
              Perfil
            </Link> */}
            <button
              onClick={signout}
              className="self-start text-base font-bold uppercase text-error md:text-base lg:text-lg"
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
    }),
  ).isRequired,
  signout: propTypes.func.isRequired,
  user: propTypes.object.isRequired,
};
