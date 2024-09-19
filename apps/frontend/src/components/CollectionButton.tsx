import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button/Button";
import { useCollectionChecker } from "../hooks/useCollectionChecker";
import { Icon } from "./ui/icon/Icon";
import { toast, Toaster } from "sonner";

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
    <>
      {isAuth && (
        <Button
          variant={`${!collectionData.length ? "info" : "error"}`}
          disabled={isLoading}
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
          {collectionData.length ? (
            <>
              <Icon name="icon-[material-symbols--close]" className="size-6" />
              Quitar de mi colección
            </>
          ) : (
            <>
              <Icon name="icon-[material-symbols--add]" className="size-6" />
              Agregar a mi colección
            </>
          )}
        </Button>
      )}
    </>
  );
};
