import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import propTypes from "prop-types";

export const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={twMerge(
        clsx(
          "bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded py-4",
          className
        )
      )}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: propTypes.node.isRequired,
  className: propTypes.string,
};
