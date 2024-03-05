import propTypes from "prop-types";
import { clsx } from "clsx";

export const Toast = ({ message, showToast }) => {
  return (
    <div
      className={clsx(
        {
          block: showToast,
          hidden: !showToast,
        },
        "toast toast-center toast-middle"
      )}
    >
      <div className="alert alert-success">
        <span>{message}</span>
      </div>
    </div>
  );
};

Toast.propTypes = {
  message: propTypes.string.isRequired,
  showToast: propTypes.bool.isRequired,
};
