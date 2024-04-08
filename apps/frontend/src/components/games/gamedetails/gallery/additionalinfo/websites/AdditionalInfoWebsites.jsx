import propTypes from "prop-types";
import websiteIcons from "../../../../../../utils/getGameDetailsAdditionalInfoIcons.js";
import { Link } from "react-router-dom";
import { CardBackground } from "../../../../../ui/cardBackground/cardBackground.jsx";

export const AdditionalInfoWebsites = ({ data }) => {
  return (
    <CardBackground className="col-span-3 md:col-span-1  flex flex-col">
      <h2 className="text-center text-3xl md:text-4xl font-semibold mb-2 text-info">
        Game Websites
      </h2>
      <ul className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {data?.websites.map((website) => {
          const websiteIcon = websiteIcons.find(
            (icon) => icon.category === website.category
          );
          return (
            <li key={website.id} className="flex">
              {websiteIcon && (
                <Link
                  to={website.url}
                  className="my-2 hover:text-error hover:scale-x-105 transition-transform duration-300 ease-in-out hover:saturate-200 hover:brightness-125 hover:font-bold text-white space-x-2"
                >
                  <img
                    src={websiteIcon.icon}
                    alt={websiteIcon.name}
                    className="size-6 inline"
                  />
                  <p className="inline text-sm">{websiteIcon.name}</p>
                </Link>
              )}
            </li>
          );
        }) || <p className="text-center col-span-4">No websites available.</p>}
      </ul>
    </CardBackground>
  );
};

AdditionalInfoWebsites.propTypes = {
  data: propTypes.object.isRequired,
};
