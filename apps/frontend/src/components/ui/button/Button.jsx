import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import propTypes from "prop-types";

export const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={twMerge(
        clsx(
          "inline-block rounded bg-buttons-500 px-8 py-3 text-sm font-medium text-textWhite-500 transition hover:scale-110 focus:outline-none focus:ring active:bg-buttons-400",
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
