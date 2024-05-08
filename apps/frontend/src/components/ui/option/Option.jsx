import propTypes from "prop-types";

export const Option = ({ children, className, ...props }) => {
  return (
    <option className={className} {...props}>
      {children}
    </option>
  );
};

Option.propTypes = {
  children: propTypes.node.isRequired,
  className: propTypes.string.isRequired,
};

Option.defaultProps = {
  children: null,
  className: "",
};
