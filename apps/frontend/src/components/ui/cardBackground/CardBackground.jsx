import propTypes from "prop-types";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const CardBackground = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        clsx(
          "bg-base-200/90 shadow-lg rounded-sm border-2 border-white/10 p-3",
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
