import { useNavigate } from "react-router-dom";
import { Button } from "../../../../ui/button/Button.tsx";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { useCollection } from "../../../../../context/CollectionContext.jsx";
import { Modal } from "../../../../ui/modal/Modal.jsx";
import { ConfirmationMessage } from "../../../../ui/confirmationMessage/ConfirmationMessage.jsx";
import toast from "../../../../../utils/toast.js";

type GameCollectionData = {
  amount_paid: number | null;
  collection_id: number;
  finish_date: string | null;
  format_name: string;
  game_cover: string;
  game_id: number;
  game_name: string;
  game_slug: string;
  is_favorite: boolean;
  name: string;
  ownership_name: string;
  platform_name: string;
  progress_notes: string;
  rating: number;
  start_date: string | null;
  status_name: string;
  store_name: string;
  user_id: number;
};

interface DetailsActionProps {
  gameSlug: string;
  gameCollectionData: GameCollectionData;
}

export const DetailsAction = ({
  gameSlug,
  gameCollectionData,
}: DetailsActionProps) => {
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const { deleteGameFromCollection } = useCollection();

  const handleShowModal = () => {
    setModalOpen(true);
  };

  const handleDeleteGame = async () => {
    deleteGameFromCollection(gameCollectionData?.collection_id).then(
      (response) => {
        if (response.ok) {
          toast(
            `${gameCollectionData?.game_name} fue eliminado de tu colección con éxito`,
            "success",
            "#fff",
            "#00A7EA",
            "top",
          );

          setModalOpen(false);
          navigate("/collection");
        } else {
          toast("Error al intentar borrar el juego", "error");
        }
      },
    );
  };

  const handleCancelDeleteGame = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={modalOpen}
        hasCloseBtn={true}
        onClose={() => setModalOpen(false)}
      >
        <ConfirmationMessage
          title="Eliminar juego"
          description={`¿Estás seguro que deseas eliminar ${gameCollectionData?.game_name} de tu colección?`}
          onConfirm={handleDeleteGame}
          onCancel={handleCancelDeleteGame}
        />
      </Modal>
      <Button
        className="font-bold uppercase disabled:cursor-not-allowed disabled:bg-gray-500 disabled:bg-opacity-70"
        onClick={() => navigate(`/games/${gameSlug}`)}
        disabled={!gameCollectionData}
      >
        Página del juego
      </Button>
      <div className="flex gap-x-2 *:flex-grow">
        <Button
          className="bg-green-500 text-xs font-bold uppercase hover:bg-green-500 hover:bg-opacity-70 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:bg-opacity-70"
          onClick={() => navigate(`/collection/update/${gameSlug}`)}
          disabled={!gameCollectionData}
        >
          <FaPencilAlt className="mr-2 inline-block" /> Actualizar
        </Button>
        <Button
          className="bg-red-500 text-xs font-bold uppercase hover:bg-red-500 hover:bg-opacity-70 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:bg-opacity-70"
          onClick={() => handleShowModal()}
          disabled={!gameCollectionData}
        >
          <FaTrashAlt className="mr-2 inline-block" />
          Eliminar
        </Button>
      </div>
    </>
  );
};
