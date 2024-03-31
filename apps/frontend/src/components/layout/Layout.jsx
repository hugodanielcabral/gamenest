import propTypes from "prop-types";
import { Footer } from "./footer/Footer.jsx";
import { Navbar } from "../navbar/Navbar.jsx";

export const Layout = ({ children }) => {
  return (
    <div className={`relative`}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: propTypes.node.isRequired,
};
