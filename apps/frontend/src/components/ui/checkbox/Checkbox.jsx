import propTypes from "prop-types";

export const Checkbox = ({ ...props }) => {
  return (
    <input type="checkbox" className="checkbox checkbox-error" {...props} />
  );
};

Checkbox.propTypes = {
  props: propTypes.object,
};
