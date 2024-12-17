import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button/Button.tsx";
import { useCollectionChecker } from "../hooks/useCollectionChecker";
import { Icon } from "./ui/icon/Icon";
import { toast, Toaster } from "sonner";
import { useState, useTransition } from "react";
import { Modal } from "./ui/modal/Modal";
import { createPortal } from "react-dom";

interface CollectionButtonProps {
  gameSlug: string;
}

export const CollectionButton = ({ gameSlug }: CollectionButtonProps) => {
  const { isAuth } = useAuth();
  const { collectionData, isLoading, deleteGameCollection, setCollectionData } =
    useCollectionChecker(gameSlug);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTrasition] = useTransition();

  const handleDelete = () => {
    startTrasition(async () => {
      setIsOpen(!isOpen);
      const response = await deleteGameCollection();

      if (response.status === 204) {
        toast.success(
          `${collectionData[0].game_name} fue eliminado de tu colección`,
          {
            duration: 3000,
            className:
              "bg-success text-white text-xs md:text-sm text-white font-nunito",
          },
        );
        setCollectionData([]);
      } else {
        toast.error("Error al eliminar el juego de tu colección", {
          duration: 3000,
          className:
            "bg-error text-white text-xs md:text-sm text-white font-nunito",
        });
      }
    });
  };

  return (
    <>
      {createPortal(
        <Toaster position="top-center" visibleToasts={1} />,
        document.body,
      )}
      {isOpen && isAuth && (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(!isOpen)}>
          <p className="text-pretty text-sm md:text-base lg:text-lg">
            ¿Estas seguro de eliminar{" "}
            <span className="font-bold text-warning">
              {collectionData[0]?.game_name}
            </span>{" "}
            de tu colección?
          </p>
          <div className="mt-2 space-x-2">
            <Button
              type="button"
              className="btn-outline"
              size="sm"
              variant="error"
              disabled={isPending}
              onClick={handleDelete}
            >
              {isPending ? "Cargando..." : "Eliminar"}
            </Button>
            <Button
              type="button"
              className="btn-outline"
              size="sm"
              variant="info"
              disabled={isPending}
              onClick={() => setIsOpen(!isOpen)}
            >
              Cancelar
            </Button>
          </div>
        </Modal>
      )}

      {isAuth && !collectionData.length && (
        <Button
          disabled={isLoading}
          variant="info"
          className="btn-outline tooltip tooltip-top"
          data-tip="Añadir a tu colección"
          onClick={() => navigate(`/collection/add/${gameSlug}`)}
        >
          <Icon name="icon-[material-symbols--add]" className="size-6" />
        </Button>
      )}

      {isAuth && collectionData.length > 0 && (
        <Button
          disabled={isLoading}
          variant="error"
          className="btn-outline tooltip tooltip-top"
          data-tip={`Eliminar ${collectionData[0]?.game_name}`}
          onClick={() => setIsOpen(true)}
        >
          <Icon name="icon-[material-symbols--delete]" className="size-6" />
        </Button>
      )}

      {isAuth && collectionData.length > 0 && (
        <Button
          disabled={isLoading}
          variant="success"
          size="md"
          className="btn-outline tooltip tooltip-top w-fit"
          data-tip={`Editar ${collectionData[0]?.game_name}`}
          onClick={() => navigate(`/collection/update/${gameSlug}`)}
        >
          <Icon name="icon-[mage--edit-fill]" className="size-6" />
        </Button>
      )}
    </>
  );
};
