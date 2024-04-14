import propTypes from "prop-types";

export const Drawer = ({ children, btnTitle }) => {
  return (
    <div className="drawer">
      <input id="drawer-filters" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="drawer-filters"
          className="drawer-button btn btn-info btn-wide"
        >
          {btnTitle}
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="drawer-filters"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 max-w-80 w-full min-h-full bg-base-200 text-base-content">
          {children}
        </ul>
      </div>
    </div>
  );
};

Drawer.propTypes = {
  children: propTypes.node.isRequired,
  btnTitle: propTypes.string.isRequired,
};
