import { Header } from "../layout/header/Header.jsx";

// eslint-disable-next-line react/prop-types
export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="grid w-5/6 grid-cols-4 gap-6 p-5 mx-auto bg-white_color">
        {children}
      </main>
    </>
  );
};
