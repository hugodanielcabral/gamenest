import { Link } from "react-router-dom";
import { Icon } from "../../ui/icon/Icon";
import { Button } from "../../ui/button/Button";
import { PATCH } from "../../../services/apiServices";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import getImageUrl from "../../../utils/getImageUrl";
import clsx from "clsx";

interface CollectionListProps {
  collections: {
    id: number;
    collection_id: number;
    game_id: string;
    game_name: string;
    game_slug: string;
    game_cover: string;
    hours_played: number;
    minutes_played: number;
    rating: number;
    ownership_name: string;
    status_name: string;
    platform_name: string;
    store_name: string;
    is_favorite: boolean;
    difficulty: string;
    cover: {
      id: number;
      url: string;
    };
    start_date: string;
    finish_date: string;
    amount_paid: string;
    user_id: string;
  }[];
  deleteGameCollection: (collection_id: number) => void;
}

const Item = ({
  game_name,
  game_slug,
  game_cover,
  hours_played,
  minutes_played,
  status_name,
  rating,
  is_favorite,
  collection_id,
  deleteGameCollection,
}: {
  game_name: string;
  game_slug: string;
  game_cover: string;
  hours_played: number;
  minutes_played: number;
  status_name: string;
  rating: number;
  is_favorite: boolean;
  collection_id: number;
  deleteGameCollection: (collection_id: number) => void;
}) => {
  const [isFavorite, setIsFavorite] = useState(is_favorite);
  const [sending, setSending] = useState(false);

  const handleFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setSending(true);

    try {
      const response = await PATCH(`/collection/update/game/${game_slug}`, {
        is_favorite: !isFavorite,
      });

      if (!response) {
        toast.error("Ocurrió un error al actualizar la información del juego", {
          duration: 3000,
          className:
            "bg-error text-white text-xs md:text-sm text-white font-nunito",
        });
        setSending(false);
        return console.error("Error");
      }

      setIsFavorite(!isFavorite);
      setSending(false);
      toast.success(
        `${game_name} fue ${isFavorite ? "quitado de" : "agregado a"} favoritos`,
        {
          duration: 3000,
          className: `bg-${isFavorite ? "error" : "success"} text-white text-xs md:text-sm text-white font-nunito`,
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="group relative flex h-32 gap-4 overflow-hidden rounded-lg border border-gray-700 bg-base-100 p-4 transition-all duration-300 ease-in-out hover:border-gray-600 hover:bg-base-200 sm:h-36 md:h-40 lg:h-44">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 blur-md transition-opacity duration-300 group-hover:opacity-30"
        style={{ backgroundImage: `url(${game_cover})` }}
      />

      <Link
        to={`/collection/${game_slug}`}
        className="relative z-10 flex w-full gap-4"
      >
        <img
          src={getImageUrl(getImageUrl(game_cover, "cover_big_2x"))}
          alt={game_name}
          className="w-16 rounded-lg object-cover sm:w-20 md:w-24 lg:w-28"
        />

        <div className="flex-grow">
          <h2
            className="line-clamp-1 text-pretty text-center text-xs font-bold text-white sm:text-sm md:text-base lg:text-lg"
            data-tip={game_name}
          >
            {game_name}
          </h2>
          <ul className="mt-2 flex flex-col justify-center gap-2">
            <li className="flex items-center gap-1">
              <Icon
                name="icon-[mdi--clock]"
                className="size-4 text-white transition duration-200 ease-linear hover:text-opacity-75 lg:size-5"
              />
              <span
                className="tooltip tooltip-top font-nunito text-xs text-gray-300 lg:text-sm"
                data-tip="Tiempo jugado"
              >
                {hours_played} hs - {minutes_played} min
              </span>
            </li>
            <li
              className="flex items-center gap-1"
              data-tip={`Estado: ${status_name}`}
            >
              <Icon
                name="icon-[material-symbols--joystick]"
                className="size-4 text-info transition duration-200 ease-linear hover:text-opacity-75 lg:size-5"
              />
              <span
                className="tooltip tooltip-top font-nunito text-xs text-gray-300 lg:text-sm"
                data-tip="Estado"
              >
                {status_name}
              </span>
            </li>
            <li
              className="flex items-center gap-1"
              data-tip={`Rating: ${rating}/5`}
            >
              <Icon
                name="icon-[streamline--star-badge-solid]"
                className="size-4 text-warning transition duration-200 ease-linear hover:text-opacity-75 lg:size-5"
              />
              <span
                className="tooltip tooltip-top font-nunito text-xs text-gray-300 lg:text-sm"
                data-tip="Rating"
              >
                {rating}/5
              </span>
            </li>
          </ul>
        </div>
      </Link>
      <Button
        onClick={handleFavorite}
        className={clsx(
          "btn-ghost tooltip tooltip-left absolute bottom-2 right-0 z-10 disabled:cursor-not-allowed disabled:opacity-50",
          {
            "tooltip-error": isFavorite,
            "tooltip-warning": !isFavorite,
          },
        )}
        size="sm"
        disabled={sending}
        data-tip={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
      >
        {isFavorite ? (
          <Icon
            name="icon-[fluent--heart-off-24-filled]"
            className="size-5 text-error sm:size-6 md:size-7 lg:size-8"
          />
        ) : (
          <Icon
            name="icon-[material-symbols--heart-plus]"
            className="size-5 text-warning sm:size-6 md:size-7 lg:size-8"
          />
        )}
      </Button>
      <Button
        onClick={() => {
          toast.warning("Estas seguro de eliminar el juego de tu colección?", {
            duration: 5000,
            className: "bg-neutral text-xs md:text-sm text-white font-nunito",
            action: (
              <>
                <Button
                  className="btn-info text-white"
                  size="sm"
                  onClick={() => {
                    deleteGameCollection(collection_id);
                    toast.dismiss();
                  }}
                >
                  Sí
                </Button>
                <Button
                  className="btn-error text-white"
                  size="sm"
                  onClick={() => {
                    toast.dismiss();
                  }}
                >
                  No
                </Button>
              </>
            ),
          });
        }}
        className={clsx(
          "btn-ghost tooltip tooltip-left tooltip-error absolute bottom-12 md:bottom-14 right-0 z-10 disabled:cursor-not-allowed disabled:opacity-50",
        )}
        size="sm"
        disabled={sending}
        data-tip={`Eliminar juego`}
      >
        <Icon
          name="icon-[material-symbols--delete]"
          className="size-5 text-error sm:size-6 md:size-7 lg:size-8"
        />
      </Button>
    </div>
  );
};

export const CollectionList = ({
  collections,
  deleteGameCollection,
}: CollectionListProps) => {
  return (
    <div className="col-span-3 grid h-fit grid-cols-1 gap-4 xl:grid-cols-2">
      {collections && collections.length > 0 ? (
        collections.map((collection, index) => (
          <Item
            key={collection.id + index}
            {...collection}
            deleteGameCollection={deleteGameCollection}
          />
        ))
      ) : (
        <div className="col-span-full flex min-h-screen justify-center">
          <p className="mt-10 text-pretty text-center font-nunito text-lg text-white sm:text-2xl md:text-3xl lg:text-4xl">
            No se encontró ningún juego en tu colección.
          </p>
        </div>
      )}
      <Toaster position="top-center" visibleToasts={1} />
    </div>
  );
};
