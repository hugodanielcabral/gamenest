import propTypes from "prop-types";

export const Select = ({ children, ...props }) => {
  return (
    <select
      className={
        "select border-t-info border-t-4 border-b-error border-r-2 border-r-gray-500/50 border-l-2 border-l-gray-500/50 border-b-4 w-full max-w-xs mt-2 p-2 rounded-md bg-base-200 focus:outline-none focus:ring-2 focus:ring-info focus:border-info focus:border-t-2 focus:border-b-2 transition-colors duration-500"
      }
      {...props}
    >
      {children}
    </select>
  );
};

Select.propTypes = {
  children: propTypes.node,
  name: propTypes.string,
};

Select.defaultProps = {
  children: null,
  name: "",
};
