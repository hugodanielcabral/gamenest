import propTypes from "prop-types";
import { MenuSection } from "./section/MenuSection";

export const Menu = ({ menuItemsActions, menuItemsGeneral }) => {
  return (
    <div
      className="absolute end-8 md:end-20 -top-8 md:-top-12 z-10 mt-2 w-44 md:w-56 divide-y rounded-md divide-info bg-base-100 shadow-lg border-2 border-info/20"
      role="menu"
    >
      <MenuSection title="General" items={menuItemsGeneral} />
      <MenuSection title="Actions" items={menuItemsActions} />
    </div>
  );
};

Menu.propTypes = {
  menuItemsActions: propTypes.array.isRequired,
  menuItemsGeneral: propTypes.array.isRequired,
};

Menu.defaultProps = {
  menuItemsActions: [],
  menuItemsGeneral: [],
};
