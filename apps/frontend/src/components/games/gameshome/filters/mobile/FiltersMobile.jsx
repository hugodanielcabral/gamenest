import { useState, useEffect } from "react";
import { GamesFiltersGenres } from "../genres/GamesFiltersGenres";
import { GamesFiltersPlatforms } from "../platforms/GamesFiltersPlatforms";

export const FiltersMobile = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      const scrolledTo = scrollTop / scrollHeight;

      if (scrolledTo > 0.1 && scrolledTo < 0.7) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", checkScroll);

    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  return (
    <div>
      <div className="z-10 drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          {isVisible && (
            <label
              htmlFor="my-drawer-4"
              className="fixed z-50 transform drawer-button btn btn-info bottom-5 lg:hidden left-1/2"
            >
              Filters
            </label>
          )}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="min-h-full p-4 menu w-80 bg-base-200 text-base-content">
            <GamesFiltersPlatforms />
            <GamesFiltersGenres />
          </ul>
        </div>
      </div>
    </div>
  );
};
