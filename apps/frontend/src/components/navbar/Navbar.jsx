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
        className={`navbar bg-base-100 grid grid-cols-3 items-center justify-between px-4 py-2 md:px-8 md:py-3 shadow-sm bg-opacity-90 *:mx-auto shadow-black min-h-[112px] sticky top-0 z-20`}
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
