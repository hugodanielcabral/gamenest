import propTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

export const Modal = ({ isOpen, hasCloseBtn, onClose, children }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const ref = useRef(null);

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
    setIsModalOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const modalElement = ref.current;
    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);
  return (
    <dialog className="modal" ref={ref} onKeyDown={handleKeyDown}>
      <div className="modal-box w-full rounded-none">
        {hasCloseBtn && (
          <button className="modal-close" onClick={handleCloseModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-x"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
        {children}
        {/* <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div> */}
      </div>
    </dialog>
  );
};

Modal.propTypes = {
  children: propTypes.node.isRequired,
  isOpen: propTypes.bool.isRequired,
  hasCloseBtn: propTypes.bool,
  onClose: propTypes.func,
};
