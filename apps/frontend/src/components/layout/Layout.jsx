import propTypes from "prop-types";
import { Header } from "../layout/header/Header.jsx";
import { Footer } from "./footer/Footer.jsx";
import style from "./Layout.module.css";

export const Layout = ({ children }) => {
  let theme = document.documentElement.getAttribute("data-theme");
  console.log(theme);

  return (
    <div
      className={`relative ${
        theme === "dracula" ? style.dracula : style.light
      } `}
    >
      <Header />
      <main className="grid w-5/6 grid-cols-4 gap-6 p-5 mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: propTypes.node.isRequired,
};
