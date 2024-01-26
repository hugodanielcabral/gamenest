import { Header } from "../layout/header/Header.jsx";

// eslint-disable-next-line react/prop-types
export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="grid w-5/6 grid-cols-4 gap-6 p-5 mx-auto bg-white_color">
        <main className="col-span-4 md:col-span-3 ">{children}</main>
        <aside>
          <div className="md:col-span-1 bg-red_color">
            SidebarSidebarSidebarSidebarSidebar
            SidebarSidebarSidebarSidebarSidebar SidebarSidebarSidebar
          </div>
        </aside>
      </div>
    </>
  );
};
