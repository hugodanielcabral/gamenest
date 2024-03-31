import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import { authRoutes, publicRoutes, privateRoutes } from "./navigation.js";
import {
  NavbarDesktop,
  NavbarLogo,
  NavbarMobile,
  NavbarUser,
} from "./index.js";

export const Navbar = () => {
  const { isAuth, signout } = useAuth();
  console.log(isAuth);
  const { pathname } = useLocation();

  return (
    <>
      <div
        className={`navbar sticky top-0 z-10 bg-gradient-to-r from-base-100 to-base-300/90 grid grid-cols-3 items-center justify-between px-4 py-2 md:px-8 md:py-3 shadow-sm bg-opacity-90 *:mx-auto shadow-black min-h-[112px]`}
      >
        <NavbarMobile
          isAuth={isAuth}
          privateRoutes={privateRoutes}
          publicRoutes={publicRoutes}
          pathname={pathname}
        />

        <NavbarDesktop
          isAuth={isAuth}
          privateRoutes={privateRoutes}
          publicRoutes={publicRoutes}
          pathname={pathname}
        />

        <NavbarLogo />

        <NavbarUser isAuth={isAuth} authRoutes={authRoutes} signout={signout} />
      </div>
    </>
  );
};
