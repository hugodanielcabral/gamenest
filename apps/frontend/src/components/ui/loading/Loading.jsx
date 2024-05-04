import propTypes from "prop-types";

export const Loading = ({ size = "loading-lg" }) => {
  return <span className={`loading loading-ring text-info ${size}`}></span>;
};

Loading.propTypes = {
  size: propTypes.string,
};

Loading.defaultProps = {
  size: "loading-lg",
};
