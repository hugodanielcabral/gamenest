import propTypes from "prop-types";
import { Button } from "../button/Button.tsx";

export const ConfirmationMessage = ({
  title,
  img,
  description,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="modal-content bg-dark-1 space-y-5 text-white">
      <h2 className="text-center text-2xl font-bold text-red-500">{title}</h2>
      {img && <img src={img} className="mx-auto my-2" />}
      <p className="text-gray-300">{description}</p>
      <div className="flex justify-end gap-2">
        <Button
          className="bg-red-500 font-bold hover:bg-red-400"
          onClick={onConfirm}
        >
          Confirmar
        </Button>
        <Button
          className="bg-transparent font-bold text-gray-300 hover:bg-transparent"
          onClick={onCancel}
        >
          Cancelar
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
