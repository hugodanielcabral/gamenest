import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { CardBackground } from "../../../../../ui/cardBackground/cardBackground.jsx";
import { websiteIcons } from "../../../../../../constants/gamedetails/websiteicons.js";

export const AdditionalInfoWebsites = ({ data }) => {
  return (
    <CardBackground className="col-span-3 md:col-span-1  flex flex-col">
      <h2 className="text-center text-xl md:text-2xl mb-2 text-info">
        Sitios web del juego
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
                  className="my-2 hover:text-error hover:scale-95 transition-transform duration-300 ease-in-out text-white space-x-2"
                >
                  <img
                    src={websiteIcon.icon}
                    alt={websiteIcon.name}
                    className="size-6 inline opacity-80 hover:opacity-100"
                  />
                  <p className="inline text-sm">{websiteIcon.name}</p>
                </Link>
              )}
            </li>
          );
        }) || (
          <p className="text-center col-span-4 text-white">
            No hay sitios web disponibles.
          </p>
        )}
      </ul>
    </CardBackground>
  );
};

AdditionalInfoWebsites.propTypes = {
  data: propTypes.object.isRequired,
};
