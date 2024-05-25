const RESOURCE_URL = import.meta.env.VITE_RESOURCE_URL;

export const getActions = (game, handleShowModal) => [
  {
    id: 1,
    name: "Actualizar",
    icon: `${RESOURCE_URL}/images/collection/icons/update.webp`,
    link: `/collection/update/${game.game_slug}`,
    action: "",
    className: "text-info hover:text-blue-300 font-bold text-xs md:text-sm",
  },
  {
    id: 2,
    name: "Eliminar",
    icon: `${RESOURCE_URL}/images/collection/icons/delete.webp`,
    tooltip: "Eliminar juego de la colección",
    link: "#",
    action: () => handleShowModal(),
    className: "text-error hover:text-red-300 text-xs md:text-sm font-bold",
  },
];

export const getMenuGeneral = (game) => [
  {
    id: 1,
    name: "Ver detalles",
    icon: ``,
    link: `/games/${game.game_slug}`,
    action: "",
    className: "text-white hover:text-gray-400 text-sm md:text-base",
  },
];
