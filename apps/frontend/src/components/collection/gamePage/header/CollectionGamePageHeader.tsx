import getImageUrl from "../../../../utils/getImageUrl";
import gameDetailsBackground from "../../../../assets/backgrounds/gamesdetails-background.webp";
import { Icon } from "../../../ui/icon/Icon";
import { Button } from "../../../ui/button/Button";
import { useNavigate } from "react-router-dom";
import { Rating } from "./rating/Rating.tsx";
import { formatPrice } from "../../../../utils/formatPrice.ts";
import { formatDate } from "../../../../utils/formatDate.ts";
import { capitalizeWord } from "../../../../utils/capitalizeWord.ts";

interface CollectionGamePageHeaderProps {
  collection: {
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
    format_name: string;
    user_id: string;
  }[];
}

const List = ({ title, content }) => {
  return (
    <li className="text-pretty rounded-md border border-gray-700 bg-base-100 p-2 font-nunito text-sm text-gray-400 md:text-base lg:text-lg">
      <strong>{title}</strong>{" "}
      <span className="text-white">{content ?? "S/D"}</span>
    </li>
  );
};

export const CollectionGamePageHeader = ({
  collection,
}: CollectionGamePageHeaderProps) => {
  const headerBackground = collection[0]?.game_cover
    ? getImageUrl(collection[0].game_cover)
    : gameDetailsBackground;

  const navigate = useNavigate();

  const gameDetails = {
    "Plataforma:": collection[0]?.platform_name,
    "Tienda:": capitalizeWord(collection[0]?.store_name) || "S/D",
    "Precio:": formatPrice(collection[0]?.amount_paid),
    "Estado:": collection[0]?.status_name,
    "Horas jugadas:": collection[0]?.hours_played,
    "Minutos jugados:": collection[0]?.minutes_played,
    "Dificultad:": capitalizeWord(collection[0]?.difficulty) || "S/D",
    "Favorito:": collection[0]?.is_favorite ? "Sí" : "No",
    "Propiedad:": collection[0]?.ownership_name,
    "Inicio:": formatDate(collection[0]?.start_date, "short"),
    "Finalización:": formatDate(collection[0]?.finish_date, "short"),
  };

  return (
    <section className="relative flex flex-col gap-4 p-4 lg:flex-row">
      <img
        src={headerBackground}
        alt={`Cover del juego "${collection[0].game_name}"`}
        className="absolute left-0 top-0 z-0 h-full w-full bg-center object-cover opacity-20 blur-md line-clamp-1"
      />
      <div className="z-10 flex h-full flex-col gap-y-4">
        <img
          src={getImageUrl(collection[0].game_cover, "cover_big_2x")}
          alt={`Cover del juego "${collection[0].game_name}"`}
          className="z-10 h-full w-64 self-center rounded-md shadow-md shadow-black"
        />
        <div className="mx-auto space-x-2">
          <Rating
            rating={collection[0]?.rating}
            gameSlug={collection[0].game_slug}
          />
        </div>
      </div>

      <div className="z-10 flex flex-grow flex-col items-center justify-between space-y-4 lg:flex-col lg:self-end">
        <div className="flex basis-2/5 flex-col gap-4">
          <h1 className="text-pretty text-center text-lg text-white md:text-2xl lg:text-3xl">
            {collection[0]?.game_name}
          </h1>
          <div className="flex justify-center gap-4">
            <Button
              disabled={!collection.length}
              variant="info"
              className="btn-outline tooltip tooltip-top"
              data-tip={`Página de ${collection[0]?.game_name}`}
              onClick={() => navigate(`/games/${collection[0]?.game_slug}`)}
            >
              <Icon
                name="icon-[fluent-mdl2--page-solid]"
                className="size-4 md:size-6"
              />
            </Button>
            <Button
              disabled={!collection.length}
              variant="success"
              className="btn-outline tooltip tooltip-top"
              data-tip={`Editar ${collection[0]?.game_name}`}
              onClick={() =>
                navigate(`/collection/update/${collection[0]?.game_slug}`)
              }
            >
              <Icon
                name="icon-[mage--edit-fill]"
                className="size-4 md:size-6"
              />
            </Button>
          </div>
        </div>

        <ul className="grid w-full grid-cols-1 gap-2 rounded-lg bg-base-300 bg-opacity-75 p-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(gameDetails).map(([title, content]) => (
            <List key={title} title={title} content={content} />
          ))}
        </ul>
      </div>
    </section>
  );
};
