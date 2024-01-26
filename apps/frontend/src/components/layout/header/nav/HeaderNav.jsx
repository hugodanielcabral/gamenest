import gameNestLogo from "../../../../assets/gamenest-logo.svg";

export const HeaderNav = () => {
  return (
    <div className="absolute bg-transparent navbar">
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-white"
          >
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Games</a>
            </li>
            <li>
              <a>Collection</a>
            </li>
            <li>
              <a>Reviews</a>
            </li>
          </ul>
        </div>
        <a className="text-xl btn btn-ghost">
          <img
            src={gameNestLogo}
            alt="GameNest Logo"
            className="w-10 h-10 mr-2"
          />
          <p className="text-white">
            Game<span className="text-red-400">Nest</span>
          </p>
        </a>
      </div>
      <div className="hidden navbar-center lg:flex">
        <ul className="px-1 text-white menu menu-horizontal">
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Games</a>
          </li>
          <li>
            <a>Collection</a>
          </li>
          <li>
            <a>Reviews</a>
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
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
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
