import propTypes from "prop-types";
import { Header } from "./header/Header.tsx";
import { Footer } from "./footer/Footer.tsx";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export const Layout = ({
  children,
  className,
  title = "Tus juegos en un solo lugar",
}) => {
  return (
    <>
      <Header />
      <title>{title + " | GameNest"}</title>
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
  title: propTypes.string,
};
