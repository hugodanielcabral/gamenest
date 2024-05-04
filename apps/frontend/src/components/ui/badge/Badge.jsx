import propTypes from "prop-types";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const Badge = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        "flex rounded-md items-center badge-error gap-2 text-white text-xs md:text-base p-1 w-fit h-fit bg-base-100",
        clsx(className)
      )}
    >
      {children}
    </div>
  );
};

Badge.propTypes = {
  children: propTypes.node.isRequired,
  className: propTypes.string,
};

Badge.defaultProps = {
  children: null,
  className: "",
};
