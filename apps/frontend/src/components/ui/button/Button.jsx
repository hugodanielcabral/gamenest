import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import propTypes from "prop-types";

export const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={twMerge(
        clsx(
          "inline-block rounded bg-info md:px-8 md:py-3 px-4 py-2 text-white hover:bg-info/90",
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
