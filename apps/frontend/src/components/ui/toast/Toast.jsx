import propTypes from "prop-types";
import { clsx } from "clsx";

export const Toast = ({ toastMessage, showToast }) => {
  return (
    <div
      className={clsx(
        {
          block: showToast,
          hidden: !showToast,
        },
        "toast toast-center toast-middle " /* "toast toast-center toast-top toast-success fixed top-4 z-50 w-full max-w-md mx-auto" */
      )}
    >
      <div className="alert alert-success">
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};

Toast.propTypes = {
  toastMessage: propTypes.string.isRequired,
  showToast: propTypes.bool.isRequired,
};
