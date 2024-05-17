import propTypes from "prop-types";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const CardBackground = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        clsx(
          "bg-base-200 bg-opacity-70 shadow-lg border-2 border-gray-700 p-3 rounded-md",
          className
        )
      )}
    >
      {children}
    </div>
  );
};

CardBackground.propTypes = {
  children: propTypes.node.isRequired,
  className: propTypes.string,
};
