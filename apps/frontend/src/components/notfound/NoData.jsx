import propTypes from "prop-types";

export const NoData = ({ className = "", message = "No data available" }) => {
  return <p className={className}>{message}</p>;
};

NoData.propTypes = {
  message: propTypes.string,
  className: propTypes.string,
};
