import propTypes from "prop-types";
import { Button } from "../button/Button";

export const ConfirmationMessage = ({
  title,
  img,
  description,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="modal-content bg-dark-1 text-white space-y-5">
      <h2 className="text-white font-bold text-2xl text-center">{title}</h2>
      {img && <img src={img} className="mx-auto my-2" />}
      <p className="text-gray-300">{description}</p>
      <div className="flex gap-2 justify-end">
        <Button
          className="bg-error hover:bg-red-400 font-bold"
          onClick={onConfirm}
        >
          Confirm
        </Button>
        <Button
          className="bg-transparent font-bold hover:bg-transparent text-gray-300"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

ConfirmationMessage.propTypes = {
  title: propTypes.string.isRequired,
  img: propTypes.string,
  description: propTypes.string.isRequired,
  onConfirm: propTypes.func.isRequired,
  onCancel: propTypes.func.isRequired,
};

ConfirmationMessage.defaultProps = {
  title: "Are you sure?",
  img: "",
  description: "Are you sure you want to do this?",
  onConfirm: () => {},
  onCancel: () => {},
};
