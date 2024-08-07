import { useEffect, useState } from "react";
import { useCollection } from "../../../../context/CollectionContext.jsx";
import { CardImage } from "../../../ui/card/image/CardImage.js";
import { CardRating } from "../../list/card/rating/CardRating.jsx";
import { DateTime } from "luxon";
import { DetailsAction } from "./actions/DetailsAction.js";
import getImageUrl from "../../../../utils/getImageUrl.js";

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


  const formattedStartDate = gameCollectionData?.start_date
    ? DateTime.fromISO(gameCollectionData.start_date, {
        zone: "utc",
      }).toFormat("dd/MM/yyyy")
    : "Sin fecha";

  const formattedFinishDate = gameCollectionData?.finish_date
    ? DateTime.fromISO(gameCollectionData.finish_date, {
        zone: "utc",
      }).toFormat("dd/MM/yyyy")
    : "Sin fecha";

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
    { id: 6, name: "Fecha de comienzo", value: formattedStartDate },
    {
      id: 7,
      name: "Total pagado",
      value: Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "ARS",
      }).format(gameCollectionData?.amount_paid ?? 0),
    },
    {
      id: 8,
      name: "Fecha de finalización",
      value: formattedFinishDate,
    },
  ];

  useEffect(() => {
    getGameFromCollection(gameSlug).then((game) => {
      setGameCollectionData(game);
    });
  }, [gameSlug]);

  return (
    <div className="flex flex-col items-center justify-around gap-x-4 md:flex-row">
      <div className="flex flex-col gap-y-2">
        <CardRating gameSlug={gameSlug} />
        <CardImage
          src={GAME_IMAGE_URL}
          alt={`Cover de ${gameCollectionData?.game_name}`}
        />
        <DetailsAction
          gameSlug={gameSlug}
          gameCollectionData={gameCollectionData}
        />
      </div>
      <div className="w-full flex-grow self-end md:w-0">
        <h3 className="mt-5 text-center text-base italic text-gray-400 sm:text-lg md:text-xl font-medium uppercase tracking-tight">
          Información de la colección
        </h3>
        <h2 className="mb-5 text-center text-3xl text-white sm:text-4xl md:mb-10 md:text-5xl">
          {gameCollectionData?.game_name ?? "Sin nombre"}
        </h2>
        <div className="grid grid-cols-2 gap-2 rounded-md bg-base-100 bg-opacity-50 p-4 *:col-span-2 *:xl:col-span-1 border-2 border-gray-700">
          {GAME_DETAILS.map((detail) => (
            <p
              key={detail.id}
              className="text-xs text-gray-400 sm:text-sm md:text-lg lg:text-xl font-medium uppercase tracking-wider"
            >
              {detail.name}:{" "}
              <span className="text-white">{detail.value ?? "Sin valor"}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
