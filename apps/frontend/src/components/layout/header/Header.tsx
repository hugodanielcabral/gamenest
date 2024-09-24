import { Nav } from "./nav/Nav";
import "./Header.css";

export const Header = () => {
  return (
    <div className="sticky top-0 z-50">
      <Nav />
      <div className="progressContainer h-1 bg-gray-500 -z-10">
        <span className="progressBar block h-full bg-info"></span>
      </div>
    </div>
  );
};
