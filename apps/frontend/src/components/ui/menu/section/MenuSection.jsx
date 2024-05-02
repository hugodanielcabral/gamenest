import propTypes from "prop-types";
import { MenuItems } from "../items/MenuItems";

export const MenuSection = ({ title, items }) => {
  return (
    <div className="p-2">
      <strong className="block p-2 text-xs font-medium uppercase text-gray-400 dark:text-gray-500">
        {title}
      </strong>
      <div className="flex justify-evenly">
        {items.map((item) => (
          <MenuItems key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

MenuSection.propTypes = {
  title: propTypes.string.isRequired,
  items: propTypes.array.isRequired,
};
