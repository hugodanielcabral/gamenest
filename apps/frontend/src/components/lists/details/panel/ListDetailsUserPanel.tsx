import { DateTime } from "luxon";
import { useAuth } from "../../../../context/AuthContext";
import { Button } from "../../../ui/button/Button";
import { Icon } from "../../../ui/icon/Icon";
import { LikeButton } from "../../../LikeButton";

interface ListDetailsUserPanelProps {
  list: {
    list_id: number;
    username: string;
    user_id: number;
    created_on: string;
    updated_on: string;
    total_games: number;
    total_likes: string;
  };
}

export const ListDetailsUserPanel = ({ list }: ListDetailsUserPanelProps) => {
  const { isAuth, user } = useAuth();
  return (
    <div className="-order-1 col-span-full flex flex-col gap-2 rounded-md p-4 lg:order-2 lg:col-span-1">
      {isAuth && user.user_id === list.user_id && (
        <div className="flex justify-center gap-2">
          <LikeButton
            likes={list.total_likes}
            id={list.list_id}
            url="lists/like"
            outline={true}
          />
          <Button
            variant="success"
            size="md"
            className="btn-outline tooltip tooltip-top w-fit"
            data-tip="Editar lista"
          >
            <Icon name="icon-[mage--edit-fill]" className="size-6" />
          </Button>
          <Button
            variant="error"
            className="btn-outline tooltip tooltip-top"
            data-tip="Eliminar lista"
          >
            <Icon name="icon-[material-symbols--delete]" className="size-6" />
          </Button>
        </div>
      )}
      <div className="divider divider-info" />
      <div className="flex items-center justify-center gap-2">
        <h2 className="text-sm md:text-lg">
          Creado por <span className="text-blue-400">{list.username}</span>
        </h2>
        <div
          className="tooltip flex items-center gap-1"
          data-tip="Total juegos"
        >
          <Icon name="icon-[basil--gamepad-solid]" className="size-8" />
          {list.total_games}
        </div>
      </div>
      <div className="divider divider-info" />

      <div className="flex flex-grow flex-col place-content-end gap-2 *:text-gray-400">
        <small>
          Creado:{" "}
          {DateTime.fromISO(list.created_on).toLocaleString(DateTime.DATE_FULL)}
        </small>
        <small>
          Actualizado:{" "}
          {DateTime.fromISO(list.created_on).toLocaleString(DateTime.DATE_FULL)}
        </small>
      </div>
    </div>
  );
};
