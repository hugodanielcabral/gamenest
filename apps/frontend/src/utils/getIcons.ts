import { gameModes } from "../constants/gamedetails/gameModes";

export const getGameModesIcon = (modeId: number) => {
  const iconFound = gameModes.find((modeIcon) => modeIcon.id === modeId);

  return iconFound ? iconFound : { icon: "icon-[ri--file-unknow-fill]" };
};
