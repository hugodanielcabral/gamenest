import propTypes from "prop-types";
import { useEffect, useRef } from "react";
import clsx from "clsx";

const RESOURCE_URL = import.meta.env.VITE_RESOURCE_URL;

export const DropDown = ({
  children,
  showDropdown,
  handleShowDropdown,
  dropdownId,
  setShowDropdown,
}) => {
  //? First i get the reference of the element that will be clicked, then i create a function that will handle the click outside the element, if the target is the same as the reference, the menu will be shown, if not, the menu will be hidden

  const ref = useRef(null);

  const handleClickOutside = ({ target }) => {
    if (target.id === ref.current.id) {
      handleShowDropdown();
    }

    if (!target.id) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <button className="relative">
      <img
        src={`${RESOURCE_URL}/images/collection/icons/actions.webp`}
        className="w-6 h-6"
        alt="Actions"
        id={dropdownId}
        ref={ref}
        data-dropdown-id={dropdownId}
      />
      <div
        className={clsx(
          "relative -top-36 left-0 md:-top-3 md:left-10 transition-all duration-300 ease-in-out transform z-10",
          {
            "translate-x-0 opacity-100 visible": showDropdown,
            "-translate-x-5 opacity-0 invisible": !showDropdown,
          }
        )}
      >
        {children}
      </div>
    </button>
  );
};

DropDown.propTypes = {
  children: propTypes.node.isRequired,
  showDropdown: propTypes.bool,
  handleShowDropdown: propTypes.func,
  dropdownId: propTypes.string,
  setShowDropdown: propTypes.func,
};

DropDown.defaultProps = {
  showDropdown: false,
  handleShowDropdown: () => {},
  dropdownId: "",
  setShowDropdown: () => {},
};
