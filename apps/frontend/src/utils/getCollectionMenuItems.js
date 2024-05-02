const RESOURCE_URL = import.meta.env.VITE_RESOURCE_URL;

export const getActions = (game, handleShowModal) => [
  {
    id: 1,
    name: "Update",
    icon: `${RESOURCE_URL}/images/collection/icons/update.webp`,
    link: `/collection/update/${game.game_slug}`,
    action: "",
    className: "text-info hover:bg-white text-sm ¿",
  },
  {
    id: 2,
    name: "Delete",
    icon: `${RESOURCE_URL}/images/collection/icons/delete.webp`,
    tooltip: "Delete",
    link: "#",
    action: () => handleShowModal(),
    className: "text-error hover:bg-white text-sm",
  },
];

export const getMenuGeneral = (game) => [
  {
    id: 1,
    name: "View game info",
    icon: ``,
    link: `/games/${game.game_slug}`,
    action: "",
    className: "text-white hover:text-black hover:bg-white text-md",
  },
];
