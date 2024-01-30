import gameNestLogo from "../../../../assets/gamenest-logo.svg";
import { Link } from "react-router-dom";

export const HeaderNav = ({ pathname }) => {
  return (
    <div
      className={`absolute z-50 navbar ${
        pathname === "/" ? "bg-transparent" : "bg-white-color"
      }`}
    >
      <div className="navbar-start">
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-grey-color rounded-box w-52 text-black-color"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/games">Games</Link>
            </li>
            <li>
              <Link to="/">Collection</Link>
            </li>
            <li>
              <Link to="/reviews">Reviews</Link>
            </li>
          </ul>
        </div>
        <a className="text-xl btn btn-ghost">
          <img
            src={gameNestLogo}
            alt="GameNest Logo"
            className="w-10 h-10 mr-2"
          />
          <p
            className={`${
              pathname === "/" ? "text-grey-color" : "text-black-color"
            }`}
          >
            Game<span className="text-red-color">Nest</span>
          </p>
        </a>
      </div>
      <div className="hidden navbar-center lg:flex">
        <ul
          className={`px-1 ${
            pathname === "/" ? "text-white-color" : "text-black-color"
          } menu menu-horizontal text-2xl font-bold`}
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/games">Games</Link>
          </li>
          <li>
            <Link to="/">Collection</Link>
          </li>
          <li>
            <Link to="/reviews">Reviews</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-grey-color bg-opacity-40 rounded-box w-52"
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
