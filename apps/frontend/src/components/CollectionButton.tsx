import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button/Button";
import { useCollectionChecker } from "../hooks/useCollectionChecker";
import { Icon } from "./ui/icon/Icon";

interface CollectionButtonProps {
  gameSlug: string;
}

export const CollectionButton = ({ gameSlug }: CollectionButtonProps) => {
  const { isAuth } = useAuth();
  const { collectionData, isLoading } = useCollectionChecker(gameSlug);
  const navigate = useNavigate();

  return (
    <>
      {isAuth && (
        <Button
          variant={`${!collectionData.length ? "info" : "error"}`}
          disabled={isLoading}
          onClick={() => {
            collectionData
              ? navigate("/collection")
              : navigate(`/collection/add/${gameSlug}`);
          }}
        >
          {collectionData.length ? (
            <>
              <Icon name="icon-[material-symbols--close]" className="size-6"/>
              Quitar de mi colección
            </>
          ) : (
            <>
              <Icon name="icon-[material-symbols--add]" className="size-6"/>
              Agregar a mi colección
            </>
          )}
        </Button>
      )}
    </>
  );
};
