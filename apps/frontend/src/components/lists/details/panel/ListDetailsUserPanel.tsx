import { DateTime } from "luxon";
import { useAuth } from "../../../../context/AuthContext";
import { Button } from "../../../ui/button/Button";
import { Icon } from "../../../ui/icon/Icon";
import { LikeButton, TotalLikes } from "../../../LikeButton";
import type { List } from "../../../../types/lists";

interface ListDetailsUserPanelProps {
  list: List;
}

export const ListDetailsUserPanel = ({ list }: ListDetailsUserPanelProps) => {
  const { isAuth, user } = useAuth();
  return (
    <div className="-order-1 col-span-full flex h-fit flex-col gap-2 rounded-md p-4 lg:order-2 lg:col-span-1">
      <div className="flex justify-center gap-2">
        {isAuth ? (
          <LikeButton
            likes={list.total_likes}
            id={list.list_id}
            url="lists/like"
          />
        ) : (
          <TotalLikes likes={list.total_likes} />
        )}
        {isAuth && user?.user_id === list?.user_id && (
          <>
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
          </>
        )}
      </div>

      <div className="divider divider-info" />
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-sm md:text-lg">
            Creado por <span className="text-blue-400">{list?.username}</span>
          </h2>
          <div
            className="tooltip flex items-center gap-1"
            data-tip="Total juegos"
          >
            <Icon
              name="icon-[basil--gamepad-solid]"
              className="size-6 md:size-8"
            />
            {list?.total_games}
          </div>
        </div>
        {list.description && (
          <p className="text-pretty font-nunito text-sm md:text-lg">
            {list.description}
          </p>
        )}
      </div>
      <div className="divider divider-info" />

      <div className="flex flex-grow flex-col place-content-end gap-2 *:text-gray-400">
        <small>
          Creado:{" "}
          {DateTime.fromISO(list?.created_on).toLocaleString(
            DateTime.DATE_FULL,
          )}
        </small>
        <small>
          Actualizado:{" "}
          {DateTime.fromISO(list?.created_on).toLocaleString(
            DateTime.DATE_FULL,
          )}
        </small>
      </div>
    </div>
  );
};
