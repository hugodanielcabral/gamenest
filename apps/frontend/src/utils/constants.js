const RESOURCE_URL = import.meta.env.VITE_RESOURCE_URL;

//* External_Games
export const EXCLUDED_STORES_CATEGORY_ID = [3, 20, 29, 30, 32, 37, 55];

export const EXCLUDED_AGE_RATINGS_CATEGORY_ID = [3, 4, 5, 6, 7];

//* DisplayDetailsGameInformation
export const GAME_FORMATS = [
  {
    id: 1,
    name: "Physical",
    iconId: `${RESOURCE_URL}/images/collection/icons/physical.webp`,
  },
  {
    id: 2,
    name: "Digital",
    iconId: `${RESOURCE_URL}/images/collection/icons/cloud.webp`,
  },
];

export const GAME_OWNERSHIP = [
  {
    id: 1,
    name: "Owned",
    iconId: `${RESOURCE_URL}/images/collection/icons/owned.webp`,
  },
  {
    id: 2,
    name: "Shared",
    iconId: `${RESOURCE_URL}/images/collection/icons/shared.webp`,
  },
  {
    id: 3,
    name: "Subscription",
    iconId: `${RESOURCE_URL}/images/collection/icons/subscription.webp`,
  },
  {
    id: 4,
    name: "Rented",
    iconId: `${RESOURCE_URL}/images/collection/icons/rented.webp`,
  },
  {
    id: 5,
    name: "Unlicensed",
    iconId: `${RESOURCE_URL}/images/collection/icons/unlicensed.webp`,
  },
  {
    id: 6,
    name: "Other",
    iconId: `${RESOURCE_URL}/images/collection/icons/other.webp`,
  },
];

export const GAME_STORES = [
  {
    id: 1,
    name: "Steam",
    iconId: `${RESOURCE_URL}/images/collection/icons/steam.webp`,
  },
  {
    id: 2,
    name: "Epic Games Store",
    iconId: `${RESOURCE_URL}/images/collection/icons/epic-games.webp`,
  },
  {
    id: 3,
    name: "Ubisoft Store",
    iconId: `${RESOURCE_URL}/images/collection/icons/ubisoft.webp`,
  },

  {
    id: 5,
    name: "GOG",
    iconId: `${RESOURCE_URL}/images/collection/icons/gog.webp`,
  },
  {
    id: 6,
    name: "Xbox Store",
    iconId: `${RESOURCE_URL}/images/collection/icons/xbox.webp`,
  },
  {
    id: 7,
    name: "PlayStation Store",
    iconId: `${RESOURCE_URL}/images/collection/icons/playstation.webp`,
  },
  {
    id: 8,
    name: "Nintendo eShop",
    iconId: `${RESOURCE_URL}/images/collection/icons/nintendo.webp`,
  },
  {
    id: 9,
    name: "Play Store",
    iconId: `${RESOURCE_URL}/images/collection/icons/play-store.webp`,
  },
  {
    id: 10,
    name: "Other",
    iconId: `${RESOURCE_URL}/images/collection/icons/other.webp`,
  },
];

export const GAME_STATUS = [
  {
    id: 1,
    name: "No status",
    iconId: `${RESOURCE_URL}/images/collection/icons/xbox-x-button.webp`,
    checked: false,
  },
  {
    id: 2,
    name: "Unplayed",
    iconId: `${RESOURCE_URL}/images/collection/icons/unplayed.webp`,
    checked: false,
  },
  {
    id: 3,
    name: "Playing",
    iconId: `${RESOURCE_URL}/images/collection/icons/joystick.webp`,
    checked: false,
  },
  {
    id: 4,
    name: "Completed",
    iconId: `${RESOURCE_URL}/images/collection/icons/fireworks.webp`,
    checked: false,
  },
  {
    id: 5,
    name: "Plan to play",
    iconId: `${RESOURCE_URL}/images/collection/icons/think.webp`,
    checked: false,
  },
  {
    id: 6,
    name: "Dropped",
    iconId: `${RESOURCE_URL}/images/collection/icons/trash.webp`,
    checked: false,
  },
];

export const ORDERBY_VALUES = [
  {
    id: 1,
    name: "Order By",
    value: "",
  },
  { id: 2, name: "Status", value: "status_name" },
  {
    id: 3,
    name: "Rating",
    value: "rating",
  },
  {
    id: 4,
    name: "Hours Played",
    value: "hours_played",
  },
  {
    id: 5,
    name: "Game Name",
    value: "game_name",
  },
];

export const SORT_VALUES = [
  {
    id: 1,
    name: "Sort",
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
