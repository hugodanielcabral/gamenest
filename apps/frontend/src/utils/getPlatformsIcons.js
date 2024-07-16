import { platformsIcons } from "../constants/gamedetails/platformsIcons";

export const getPlatformsIcons = (platformId) => {
  const iconFound = platformsIcons.find(
    (platformIcon) => platformIcon.platform_id === platformId,
  );

  return iconFound ?? { icon: "icon-[ri--file-unknow-fill]" };
};
