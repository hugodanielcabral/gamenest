import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import propTypes from "prop-types";

export const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={twMerge(
        clsx(
          "inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:-rotate-2 hover:scale-110 focus:outline-none focus:ring active:bg-indigo-500",
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
