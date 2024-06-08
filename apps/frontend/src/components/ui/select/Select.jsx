import propTypes from "prop-types";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const Select = ({ children, className, ...props }) => {
  return (
    <select
      className={twMerge(
        clsx(
          "select w-full max-w-xs mt-2 p-2 rounded-md bg-base-200 border border-info focus:outline-none focus:ring-1 focus:ring-info focus:border-info transition-colors duration-500",
          className
        )
      )}
      {...props}
    >
      {children}
    </select>
  );
};

Select.propTypes = {
  children: propTypes.node,
  name: propTypes.string,
  className: propTypes.string,
};

Select.defaultProps = {
  children: null,
  name: "",
  className: "",
};
