import propTypes from "prop-types";
import { useState } from "react";
import { Modal } from "../../../../../ui/modal/Modal";
import { clsx } from "clsx";
import rightArrow from "../../../../../../assets/icons/arrow-right.svg";

export const AdditionalInfoStoryline = ({ data }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const storylineTextLength = data?.storyline?.length;

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  return (
    <div className="col-span-3  bg-base-200/90 shadow-lg rounded-sm border-2 border-white/10 p-3">
      <h2 className="text-center text-3xl md:text-4xl font-semibold text-error">
        Storyline
      </h2>
      <p className="text-base text-pretty md:text-2xl line-clamp-6">
        {data?.storyline?.length > 0 ? (
          data.storyline
        ) : (
          <p className="text-center mt-2">No storyline available.</p>
        )}
      </p>
      <div className="flex items-center justify-end">
        <button
          className={clsx(
            {
              hidden: storylineTextLength < 660,
              inline: storylineTextLength > 660,
            },
            "font-semibold text-error text-lg"
          )}
          onClick={handleOpenModal}
        >
          Read more.
          <img
            src={rightArrow}
            alt="Read more arrow"
            className="size-10 inline"
          />
        </button>
      </div>
      <Modal
        isOpen={modalOpen}
        hasCloseBtn={true}
        onClose={() => setModalOpen(false)}
      >
        <h2 className="font-bold text-info text-center text-3xl">
          {data?.name}
        </h2>
        <p className="text-base text-pretty md:text-3xl">{data?.storyline}</p>
      </Modal>
    </div>
  );
};

AdditionalInfoStoryline.propTypes = {
  data: propTypes.object.isRequired,
};
