import propTypes from "prop-types";
import { Footer } from "./footer/Footer.jsx";
import { Navbar } from "../navbar/Navbar.jsx";

export const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: propTypes.node.isRequired,
};
