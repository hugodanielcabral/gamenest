import { websiteIcons } from "../constants/gamedetails/websiteicons";

export const getWebSiteIcons = (webSiteId) => {
  const foundIcon = websiteIcons.find(
    (webSiteIcon) => webSiteIcon.category === webSiteId,
  );

  return foundIcon ? foundIcon : "";
};
