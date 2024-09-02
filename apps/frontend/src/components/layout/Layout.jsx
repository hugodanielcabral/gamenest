import propTypes from "prop-types";
import { Navbar } from "../navbar/Navbar.jsx";
import { Header } from "./header/Header.tsx";
import { Footer } from "./footer/Footer.jsx";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export const Layout = ({ children, className }) => {
  return (
    <>
      {/*       <Navbar />
       */}{" "}
      <Header />
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
