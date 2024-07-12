import propTypes from "prop-types";
import { Footer } from "./footer/Footer.jsx";
import { Navbar } from "../navbar/Navbar.jsx";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export const Layout = ({ children, className }) => {
  return (
    <>
      <Navbar />
      <main className={twMerge(clsx("min-h-screen", className))}>
        {children}
      </main>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: propTypes.node.isRequired,
  className: propTypes.string,
};
