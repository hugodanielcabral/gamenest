import propTypes from "prop-types";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const Label = ({ children, className, ...props }) => {
  return (
    <label
      className={twMerge(
        clsx("flex items-center gap-2 input input-bordered", className)
      )}
      {...props}
    >
      {children}
    </label>
  );
};

Label.propTypes = {
  children: propTypes.node.isRequired,
  className: propTypes.string.isRequired,
};

Label.defaultProps = {
  className: "",
};
