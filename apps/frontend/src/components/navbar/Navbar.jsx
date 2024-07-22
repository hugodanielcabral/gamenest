import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import { authRoutes, publicRoutes, privateRoutes } from "./navigation.js";
import {
  NavbarLinkList,
  NavbarLinkListDropdown,
  NavbarLogo,
  NavbarUserSettings,
} from "./index.js";

export const Navbar = () => {
  const { isAuth, signout, user } = useAuth();
  const { pathname } = useLocation();

  return (
    <>
      <div
        className={`navbar sticky top-0 z-20 grid min-h-[112px] grid-cols-3 items-center justify-between border-b-8 border-blue-500 bg-base-300 bg-opacity-90 px-4 py-2 shadow-md shadow-black *:mx-auto md:px-8 md:py-3`}
      >
        <NavbarLinkListDropdown
          isAuth={isAuth}
          privateRoutes={privateRoutes}
          publicRoutes={publicRoutes}
          pathname={pathname}
        />

        <NavbarLinkList
          isAuth={isAuth}
          privateRoutes={privateRoutes}
          publicRoutes={publicRoutes}
          pathname={pathname}
        />

        <NavbarLogo />

        <NavbarUserSettings
          isAuth={isAuth}
          user={user}
          authRoutes={authRoutes}
          signout={signout}
        />
      </div>
    </>
  );
};
