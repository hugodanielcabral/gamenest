import { Header } from "../layout/header/Header.jsx";
import propTypes from "prop-types";

export const Layout = ({ children }) => {
  return (
    <div className="relative">
      <Header />
      <main className="grid w-5/6 grid-cols-4 gap-6 p-5 mx-auto">
        {children}
      </main>
    </div>
  );
};

Layout.propTypes = {
  children: propTypes.node.isRequired,
};
