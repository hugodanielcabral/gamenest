import { useEffect, useState } from "react";
import { useCollection } from "../../../../context/CollectionContext.jsx";
import getImageUrl from "../../../../utils/getImageUrl.js";
import { Button } from "../../../ui/button/Button.jsx";
import { useNavigate } from "react-router-dom";
import { CardImage } from "../../../ui/card/image/CardImage.js";
import {CardRating} from "../../list/card/rating/CardRating.jsx";
import { DateTime } from "luxon";
import { CardActions } from "../../list/card/actions/CardActions.jsx";

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

type GamePageDetailsProps = {
  gameSlug: string;
};

export const GamePageDetails = ({ gameSlug }: GamePageDetailsProps) => {
  const [gameCollectionData, setGameCollectionData] = useState<
    GameCollectionData | undefined
  >(undefined);

  const { isLoading: isLoadingCollection, getGameFromCollection } =
    useCollection();

  const navigate = useNavigate();

  const COVER_IMAGE =
    gameCollectionData?.game_cover ||
    "https://placehold.co/264x352?text=No+Cover+Image+Available";

  const GAME_IMAGE_URL = getImageUrl(COVER_IMAGE, "cover_big_2x");

  const GAME_DETAILS = [
    { id: 1, name: "Formato", value: gameCollectionData?.format_name },
    { id: 2, name: "Plataforma", value: gameCollectionData?.platform_name },
    { id: 3, name: "Tienda", value: gameCollectionData?.store_name },
    { id: 4, name: "Propiedad", value: gameCollectionData?.ownership_name },
    { id: 5, name: "Estado", value: gameCollectionData?.status_name },
    { id: 6, name: "Fecha de comienzo", value: DateTime.fromISO(gameCollectionData?.start_date ?? "").toFormat("dd/MM/yyyy")},
    { id: 7, name: "Total pagado", value: Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "ARS",
    }).format(gameCollectionData?.amount_paid ?? 0)
    },
    {
      id: 8,
      name: "Fecha de finalización",
      value: DateTime.fromISO(gameCollectionData?.finish_date ?? "").toFormat(
        "dd/MM/yyyy"
        ),
    },
  ];

  useEffect(() => {
    getGameFromCollection(gameSlug).then((game) => {
      setGameCollectionData(game);
    });
  }, [gameSlug]);


  return (
    <div className="mt-10 flex flex-col items-center justify-around gap-x-4 md:flex-row">
      <div className="flex flex-col gap-y-2">
        <CardRating gameData={gameCollectionData} />
        <CardActions gameData={gameCollectionData} />
        <CardImage src={GAME_IMAGE_URL} alt={`Cover de ${gameCollectionData?.game_name}`} />
        <Button
          className="font-bold uppercase"
          onClick={() => navigate(`/games/${gameSlug}`)}
        >
          Página del juego
        </Button>
        <Button
          className="bg-green-500 font-bold uppercase hover:bg-green-500 hover:bg-opacity-70"
          onClick={() => navigate(`/collection/update/${gameSlug}`)}
        >
          Actualizar info
        </Button>
      </div>
      <div className="w-full flex-grow self-end md:w-0">
        <h3 className="mt-5 text-center text-base italic text-gray-400 sm:text-lg md:text-xl">
          Información de la colección
        </h3>
        <h2 className="mb-5 text-center text-3xl text-blue-400 sm:text-4xl md:mb-10 md:text-5xl">
          {gameCollectionData?.game_name ?? "Sin nombre"}
        </h2>
        <div className="grid grid-cols-2 gap-2 rounded-md bg-base-100 bg-opacity-50 p-4 *:col-span-2 *:md:col-span-1">
          {GAME_DETAILS.map((detail) => (
            <p key={detail.id} className="text-lg text-gray-400 sm:text-xl md:text-2xl">
              {detail.name}: <span className="text-white">{detail.value ?? "Sin valor"}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
