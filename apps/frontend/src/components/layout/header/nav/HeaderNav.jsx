import gameNestLogo from "../../../../assets/gamenest-logo.png";
import { Link } from "react-router-dom";
import "./HeaderNav.css";
import { ThemeSwitcher } from "../../../themeswitcher/ThemeSwitcher";
import { authRoutes, privateRoutes, publicRoutes } from "./navigation.js";
import { useAuth } from "../../../../context/AuthContext.jsx";

// eslint-disable-next-line react/prop-types
//! Quitar el pathname - O mejor, hacer un rework de la navbar.
export const HeaderNav = ({ pathname }) => {
  const { isAuth, signout } = useAuth();

  return (
    <div
      className={`z-10 navbar relative ${
        pathname === "/"
          ? "bg-transparent"
          : "bg-base-300 sticky top-0 shadow-lg bg-opacity-90"
      }`}
    >
      <div className="hidden transform md:-translate-x-1/2 md:-translate-y-1/2 md:absolute md:left-1/2 md:top-1/2 lg:left-3/4 lg:top-auto lg:translate-x-0 lg:translate-y-0 md:block">
        <ThemeSwitcher />
      </div>
      <div className="py-3 navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-52 text-white uppercase"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/games">Games</Link>
            </li>

            {!isAuth
              ? authRoutes.map((route) => (
                  <li key={route.path}>
                    <Link className="text-red-500" to={route.path}>
                      {route.name}
                    </Link>
                  </li>
                ))
              : privateRoutes.map((route) => (
                  <li key={route.path}>
                    <Link to={route.path}>{route.name}</Link>
                  </li>
                ))}
            <li onClick={signout}>Logout</li>
          </ul>
        </div>
        <Link className="flex items-center text-xs font-bold" to="/">
          <img src={gameNestLogo} alt="" className="size-12" />
          <p
            className={`${
              pathname === "/" ? "text-grey-color" : "text-stone-950-700"
            }`}
          >
            Game<span className="text-error">Nest</span>
          </p>
        </Link>
      </div>
      <div className="hidden navbar-center lg:flex">
        <ul
          className={`px-1 ${
            pathname === "/" ? "text-white-color" : "text-base"
          } menu menu-horizontal text-2xl font-bold uppercase`}
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/games">Games</Link>
          </li>
          {!isAuth ? (
            authRoutes.map((route) => (
              <li key={route.path}>
                <Link className="text-pink-500" to={route.path}>
                  {route.name}
                </Link>
              </li>
            ))
          ) : (
            <>
              {privateRoutes.map((route) => (
                <li key={route.path}>
                  <Link to={route.path}>{route.name}</Link>
                </li>
              ))}
              <li onClick={() => signout()}>Logout</li>
            </>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="w-10 h-10 btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 h-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-300 bg-opacity-40 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
