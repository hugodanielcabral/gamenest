import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button/Button";
import { useCollectionChecker } from "../hooks/useCollectionChecker";
import { Icon } from "./ui/icon/Icon";
import { toast } from "sonner";

interface CollectionButtonProps {
  gameSlug: string;
}

export const CollectionButton = ({ gameSlug }: CollectionButtonProps) => {
  const { isAuth } = useAuth();
  const { collectionData, isLoading, deleteGameCollection, setCollectionData } =
    useCollectionChecker(gameSlug);
  const navigate = useNavigate();

  const handleOnDelete = async () => {
    try {
      const response = await deleteGameCollection();

      if (response.status === 204) {
        toast.success(
          `${collectionData[0].game_name} fue eliminado de tu colección`,
        );
        setCollectionData([]);
      } else {
        toast.error("Error al eliminar el juego de tu colección");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar el juego de tu colección");
    }
  };

  return (
    <div className="flex gap-2">
      {isAuth && !collectionData.length && (
        <Button
          disabled={isLoading}
          variant="info"
          className="tooltip tooltip-top"
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
          className="tooltip tooltip-top"
          data-tip={`Eliminar ${collectionData[0]?.game_name}`}
          onClick={() => {
            collectionData.length
              ? toast.warning(
                  `¿Estás seguro de que deseas eliminar ${collectionData[0].game_name} de tu colección?`,
                  {
                    action: {
                      label: "Sí",
                      onClick: () => handleOnDelete(),
                    },
                  },
                )
              : navigate(`/collection/add/${gameSlug}`);
          }}
        >
          <Icon name="icon-[material-symbols--delete]" className="size-6" />
        </Button>
      )}

      {isAuth && collectionData.length > 0 && (
        <Button
          disabled={isLoading}
          variant="success"
          size="md"
          className="tooltip tooltip-top w-fit"
          data-tip={`Editar ${collectionData[0]?.game_name}`}
          onClick={() => navigate(`/collection/update/${gameSlug}`)}
        >
          <Icon name="icon-[mage--edit-fill]" className="size-6" />
        </Button>
      )}
    </div>
  );
};
