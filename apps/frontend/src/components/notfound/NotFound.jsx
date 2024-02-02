import propTypes from "prop-types";

export const NotFound = ({ message, className }) => {
  return <h1 className={className}>{message}</h1>;
};

NotFound.propTypes = {
  message: propTypes.string.isRequired,
  className: propTypes.string,
};
