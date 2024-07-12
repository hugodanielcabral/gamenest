const RESOURCE_URL = import.meta.env.VITE_RESOURCE_URL;

//* External_Games
export const EXCLUDED_STORES_CATEGORY_ID = [3, 20, 29, 30, 32, 37, 55];

export const EXCLUDED_AGE_RATINGS_CATEGORY_ID = [3, 4, 5, 6, 7];

//* DisplayDetailsGameInformation
export const GAME_FORMATS = [
  {
    id: 1,
    title: "Físico",
    name: "Físico",
    iconId: `${RESOURCE_URL}/images/collection/icons/physical.webp`,
  },
  {
    id: 2,
    title: "Digital",
    name: "Digital",
    iconId: `${RESOURCE_URL}/images/collection/icons/cloud.webp`,
  },
];

export const GAME_OWNERSHIP = [
  {
    id: 1,
    title: "Comprado",
    name: "Comprado",
    iconId: `${RESOURCE_URL}/images/collection/icons/owned.webp`,
  },
  {
    id: 2,
    title: "Compartido",
    name: "Compartido",
    iconId: `${RESOURCE_URL}/images/collection/icons/shared.webp`,
  },
  {
    id: 3,
    title: "Suscripción",
    name: "Suscripción",
    iconId: `${RESOURCE_URL}/images/collection/icons/subscription.webp`,
  },
  {
    id: 4,
    title: "Alquilado",
    name: "Alquilado",
    iconId: `${RESOURCE_URL}/images/collection/icons/rented.webp`,
  },
  {
    id: 5,
    title: "Sin licencia",
    name: "Sin licencia",
    iconId: `${RESOURCE_URL}/images/collection/icons/unlicensed.webp`,
  },
  {
    id: 6,
    title: "Otro",
    name: "Otro",
    iconId: `${RESOURCE_URL}/images/collection/icons/other.webp`,
  },
];

export const GAME_STORES = [
  {
    id: 1,
    title: "Steam",
    name: "Steam",
    iconId: `${RESOURCE_URL}/images/collection/icons/steam.webp`,
  },
  {
    id: 2,
    title: "Epic Games",
    name: "Epic Games Store",
    iconId: `${RESOURCE_URL}/images/collection/icons/epic-games.webp`,
  },
  {
    id: 3,
    title: "Ubisoft",
    name: "Ubisoft Store",
    iconId: `${RESOURCE_URL}/images/collection/icons/ubisoft.webp`,
  },

  {
    id: 5,
    title: "GOG",
    name: "GOG",
    iconId: `${RESOURCE_URL}/images/collection/icons/gog.webp`,
  },
  {
    id: 6,
    title: "Xbox",
    name: "Xbox Store",
    iconId: `${RESOURCE_URL}/images/collection/icons/xbox.webp`,
  },
  {
    id: 7,
    title: "PlayStation",
    name: "PlayStation Store",
    iconId: `${RESOURCE_URL}/images/collection/icons/playstation.webp`,
  },
  {
    id: 8,
    title: "Nintendo",
    name: "Nintendo eShop",
    iconId: `${RESOURCE_URL}/images/collection/icons/nintendo.webp`,
  },
  {
    id: 9,
    title: "Play Store",
    name: "Play Store",
    iconId: `${RESOURCE_URL}/images/collection/icons/play-store.webp`,
  },
  {
    id: 10,
    title: "Otros",
    name: "Otros",
    iconId: `${RESOURCE_URL}/images/collection/icons/other.webp`,
  },
];

export const GAME_STATUS = [
  {
    id: 1,
    title: "Sin estado",
    name: "Sin estado",
    iconId: `${RESOURCE_URL}/images/collection/icons/circle-off.webp`,
    checked: false,
  },
  {
    id: 2,
    title: "Sin jugar",
    name: "Sin jugar",
    iconId: `${RESOURCE_URL}/images/collection/icons/mouse-off.webp`,
    checked: false,
  },
  {
    id: 3,
    title: "Jugando",
    name: "Jugando",
    iconId: `${RESOURCE_URL}/images/collection/icons/mouse.webp`,
    checked: false,
  },
  {
    id: 4,
    title: "Completado",
    name: "Completado",
    iconId: `${RESOURCE_URL}/images/collection/icons/party-popper.webp`,
    checked: false,
  },
  {
    id: 5,
    title: "En espera",
    name: "En espera",
    iconId: `${RESOURCE_URL}/images/collection/icons/think.webp`,
    checked: false,
  },
  {
    id: 6,
    title: "Abandonado",
    name: "Abandonado",
    iconId: `${RESOURCE_URL}/images/collection/icons/ghost.webp`,
    checked: false,
  },
];

export const ORDERBY_VALUES = [
  {
    id: 1,
    name: "Ordenar por",
    value: "",
  },
  { id: 2, name: "Estado", value: "status_name" },
  {
    id: 3,
    name: "Valoración",
    value: "rating",
  },
  {
    id: 4,
    name: "Horas jugadas",
    value: "total_played",
  },
  {
    id: 5,
    name: "Nombre del juego",
    value: "game_name",
  },
];

export const SORT_VALUES = [
  {
    id: 1,
    name: "Orden",
    value: "",
  },
  {
    id: 2,
    name: "ASC",
    value: "asc",
  },
  {
    id: 3,
    name: "DESC",
    value: "desc",
  },
];
