import propTypes from "prop-types";
import { useCollection } from "../../../../../context/CollectionContext";
import toast from "../../../../../utils/toast";
import { RatingStars } from "./stars/RatingStars";
import { useEffect, useState } from "react";
import { Modal, Button } from "../../../../ui";
import clsx from "clsx";

export const CardRating = ({ gameData }) => {
  const { updateGameFromCollection } = useCollection();

  const [rating, setRating] = useState(gameData.rating);
  const [currentRating, setCurrentRating] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const GAME_NAME = gameData.game_name;
  const TOTAL_STARS = [1, 2, 3, 4, 5];

  const handleUpdateRating = async (rating) => {
    setButtonDisabled(true);
    updateGameFromCollection(gameData.game_slug, { rating }).then(
      (response) => {
        if (response.ok) {
          setButtonDisabled(false);
          toast(
            `${gameData.game_name} fue calificado con ${rating} estrellas`,
            "success",
            "#fff",
          );
        } else {
          setButtonDisabled(false);
          toast(
            `Ocurrió un error al intentar calificar ${gameData.game_name}`,
            "error",
            "#fff",
            "#FF5861",
          );
        }
      },
    );
  };

  const handleOnChange = (rating) => {
    setRating(rating);
    setCurrentRating(rating);
  };

  const handleShowModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    setRating(gameData.rating);
  }, [gameData.rating]);

  return (
    <div className="col-span-2 row-span-1 mx-auto self-center">
      <RatingStars
        TOTAL_STARS={TOTAL_STARS}
        rating={rating}
        GAME_NAME={GAME_NAME}
        setCurrentRating={setCurrentRating}
        handleOnChange={handleOnChange}
        handleShowModal={handleShowModal}
      />
      <Modal
        isOpen={modalOpen}
        hasCloseBtn={true}
        onClose={() => setModalOpen(false)}
      >
        <section className="flex flex-col gap-5">
          <h2 className="text-center text-2xl font-semibold text-info">
            {GAME_NAME}
          </h2>
          <div className="self-center">
            {Array.from({ length: currentRating }, (_, i) => (
              <span
                key={i}
                className={clsx(
                  {
                    "text-warning": currentRating > 3,
                    "text-error": currentRating < 3,
                    "text-success": currentRating === 3,
                  },
                  "text-2xl",
                )}
              >
                ★
              </span>
            ))}
          </div>
          <h3 className="text-center text-xl font-semibold text-white">
            ¿Estás seguro de querer calificar a{" "}
            <span className="text-info">{GAME_NAME}</span> con{" "}
            <span
              className={clsx(
                {
                  "text-warning": currentRating > 3,
                  "text-error": currentRating < 3,
                  "text-success": currentRating === 3,
                },
                "text-xl",
              )}
            >
              {currentRating}
            </span>{" "}
            estrellas?
          </h3>
          <div className="mx-auto space-x-4 *:font-bold">
            <Button
              disabled={buttonDisabled}
              onClick={() => {
                handleUpdateRating(currentRating);
                setModalOpen(false);
              }}
            >
              Confirmar
            </Button>
            <Button
              className="bg-error hover:bg-error/70"
              onClick={() => {
                setModalOpen(false);
                setRating(gameData.rating);
              }}
            >
              Cancelar
            </Button>
          </div>
        </section>
      </Modal>
    </div>
  );
};

CardRating.propTypes = {
  gameData: propTypes.object.isRequired,
};

CardRating.defaultProps = {
  gameData: {},
};
