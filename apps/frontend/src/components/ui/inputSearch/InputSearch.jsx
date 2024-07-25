import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import propTypes from "prop-types";

export const InputSearch = ({
  children,
  className,
  handleKeyDown,
  ...props
}) => {
  return (
    <label
      className={twMerge(
        clsx("input input-bordered flex items-center gap-2", className),
      )}
    >
      <input
        type="text"
        className="grow"
        placeholder="Search..."
        onKeyDown={handleKeyDown}
        {...props}
      />
      {children}
    </label>
  );
};

InputSearch.propTypes = {
  children: propTypes.node,
  className: propTypes.string,
  handleKeyDown: propTypes.func,
};

InputSearch.defaultProps = {
  children: null,
  className: "",
  handleKeyDown: () => {},
};
