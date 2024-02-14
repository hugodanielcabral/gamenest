import propTypes from "prop-types";
import { useEffect, useState } from "react";
import { useGames } from "../../../../../context/GamesContext";
import { FaFilter } from "react-icons/fa";

export const GamesFiltersDrawer = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { games } = useGames();

  useEffect(() => {
    const handleClick = (e) => {
      if (e.target.matches(".drawer-overlay")) {
        setIsDrawerOpen(false);
      }
    };

    document.addEventListener("click", handleClick);

    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isDrawerOpen]);

  document.addEventListener("scroll", () => {
    const drawer = document.querySelector(".drawer");
    if (drawer) {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.scrollY + window.innerHeight;
      const scrollPercentage = (scrollPosition / scrollHeight) * 100;

      if (scrollPercentage > 40 && scrollPercentage < 90) {
        drawer.classList.add("fixed");
        drawer.classList.remove("hidden");
      } else {
        drawer.classList.remove("fixed");
        drawer.classList.add("hidden");
      }
    }
  });

  return (
    <>
      {games.length > 0 && (
        <div className="z-50 bottom-[50px] left-2/4 drawer drawer-end lg:hidden">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label
              htmlFor="my-drawer-4"
              className="bg-base-content drawer-button btn btn-outline text-base-300 drawer-button-lg"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
              <FaFilter />
              Filters
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-4"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="min-h-full p-4 menu w-80 bg-base-200 text-base-content">
              {children}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

GamesFiltersDrawer.propTypes = {
  children: propTypes.node.isRequired,
};
