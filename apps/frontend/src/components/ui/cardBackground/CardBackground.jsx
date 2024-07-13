import propTypes from "prop-types";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const CardBackground = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        clsx(
          "rounded-md border-2 border-gray-700 bg-base-100 bg-opacity-70 p-3 shadow-md shadow-black",
          className,
        ),
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
