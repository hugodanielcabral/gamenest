import { useEffect, useRef } from "react";
import { Button } from "../button/Button.tsx";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen = false, onClose, children }: ModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!modalRef) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      modalRef.current.showModal();
    } else {
      document.body.style.overflow = "";
      modalRef.current.close();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleOnModalClose = () => {
    if (typeof onClose === "function") {
      return onClose();
    }
  };

  return (
    <>
      <dialog
        role="dialog"
        className="flex flex-col rounded-lg border-2 border-gray-700 bg-base-100 bg-opacity-90 p-4 backdrop:bg-base-100 backdrop:bg-opacity-70"
        ref={modalRef}
      >
        <Button
          autoFocus
          className="mb-8 self-end border-2 focus:border-orange-500"
          variant="error"
          size="sm"
          onClick={handleOnModalClose}
        >
          Cerrar
        </Button>
        {children}
      </dialog>
    </>
  );
};
