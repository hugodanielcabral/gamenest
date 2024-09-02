import { Nav } from "./nav/Nav";

export const Header = () => {
  return (
    <div className="border-b-4 border-opacity-90 border-info sticky top-0 z-50">
      <Nav />
    </div>
  );
};
