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
    <div className="modal-content bg-dark-1 text-white">
      <h2 className="text-white text-2xl text-center">{title}</h2>
      {img && <img src={img} className="mx-auto my-2" />}
      <p className="text-white">{description}</p>
      <div className="flex gap-2 mt-5">
        <Button onClick={onConfirm}>Confirm</Button>
        <Button className="bg-error hover:bg-error/60" onClick={onCancel}>
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
