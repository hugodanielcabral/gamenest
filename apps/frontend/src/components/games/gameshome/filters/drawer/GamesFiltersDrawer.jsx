import { useEffect, useState } from "react";
import propTypes from "prop-types";
import { FaFilter } from "react-icons/fa";

export const GamesFiltersDrawer = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
    console.log(window.scrollY);
    if (drawer) {
      if (window.scrollY < 2500 && window.scrollY > 200) {
        drawer.classList.add("fixed");
        drawer.classList.remove("hidden");
      } else {
        drawer.classList.remove("fixed");
        drawer.classList.add("hidden");
      }
    }
  });

  /*   useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      const totalDocScrollLength = docHeight - windowHeight;
      const scrollPositionInPercentage =
        (scrollPosition / totalDocScrollLength) * 100;

      const drawer = document.querySelector(".drawer");
      if (drawer) {
        if (
          scrollPositionInPercentage > 10 &&
          scrollPositionInPercentage < 90
        ) {
          drawer.classList.add("fixed");
          drawer.classList.remove("hidden");
        } else {
          drawer.classList.remove("fixed");
          drawer.classList.add("hidden");
        }
      }
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []); */

  return (
    <div className="z-50  bottom-[50px] left-2/4 drawer drawer-end lg:hidden">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-4"
          className="drawer-button btn btn-primary drawer-button-lg"
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
  );
};

GamesFiltersDrawer.propTypes = {
  children: propTypes.node.isRequired,
};
