import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import propTypes from "prop-types";

export const Input = ({ className, ...props }) => {
  return (
    <input className={twMerge(clsx("w-full max-w-xs", className))} {...props} />
  );
};

Input.propTypes = {
  className: propTypes.string.isRequired,
};
