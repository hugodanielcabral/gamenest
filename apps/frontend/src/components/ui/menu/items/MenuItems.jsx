import { Link } from "react-router-dom";
import propTypes from "prop-types";

export const MenuItems = ({ item }) => {
  return (
    <Link
      to={item.link}
      onClick={item.action}
      className={`flex w-full items-center gap-1 justify-center rounded-lg px-4 py-2 ${item.className}`}
      role="menuitem"
    >
      <img src={item.icon} alt="" className="w-4 h-4" />
      {item.name}
    </Link>
  );
};

MenuItems.propTypes = {
  item: propTypes.object.isRequired,
};

MenuItems.defaultProps = {
  item: {},
};
