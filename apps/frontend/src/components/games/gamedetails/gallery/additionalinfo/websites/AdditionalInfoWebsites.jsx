import propTypes from "prop-types";
import { CardBackground } from "../../../../../ui/cardBackground/CardBackground.jsx";
import { MediaList } from "../../../media/list/MediaList";
import { getWebSiteIcons } from "../../../../../../utils/getWebSiteIcons.js";
import { Link } from "react-router-dom";

export const AdditionalInfoWebsites = ({ websiteData }) => {
  return (
    <CardBackground className="flex flex-col gap-y-2 rounded-md border-2 border-gray-700 bg-base-100 bg-opacity-70 shadow-transparent">
      <h3 className="text-center text-xs uppercase tracking-wider text-blue-400 sm:text-sm md:text-base lg:text-lg xl:text-xl">
        Sitios web
      </h3>
      <ul className="mx-auto flex max-w-[70%] flex-wrap gap-4 lg:max-w-[80%]">
        {websiteData ? (
          websiteData.map((website) => (
            <Link key={website.id} to={website?.url} target="_blank">
              <MediaList
                id={website.category}
                name={website.name}
                icon={getWebSiteIcons(website.category).icon}
                className="size-4 sm:size-5 md:size-6 lg:size-7 xl:size-10"
              />
            </Link>
          ))
        ) : (
          <p className="text-pretty text-center text-xs text-gray-400 md:text-base">
            No hay sitios web disponibles
          </p>
        )}
      </ul>
    </CardBackground>
  );
};

AdditionalInfoWebsites.propTypes = {
  websiteData: propTypes.object.isRequired,
};
