import propTypes from "prop-types";
import websiteIcons from "../../../../../../utils/getGameDetailsAdditionalInfoIcons.js";
import { Link } from "react-router-dom";

export const AdditionalInfoWebsites = ({ data }) => {
  return (
    <div className="col-span-3 md:col-span-1 bg-base-200/90 shadow-lg rounded-sm border-2 border-white/10 p-3">
      <h2 className="text-center text-3xl md:text-4xl font-semibold mb-2 text-info">
        Game Websites
      </h2>
      <ul className="grid grid-cols-4 gap-10 w-fit m-auto">
        {data?.websites.map((website) => {
          const websiteIcon = websiteIcons.find(
            (icon) => icon.category === website.category
          );
          return (
            <li key={website.id} className="col-span-1">
              <Link to={website.url}>
                {websiteIcon && (
                  <img
                    src={websiteIcon.icon}
                    alt={websiteIcon.name}
                    className="size-8 hover:scale-110 transition-transform duration-300 ease-in-out hover:saturate-200 hover:brightness-125"
                  />
                )}
              </Link>
            </li>
          );
        }) || <p className="text-center col-span-4">No websites available.</p>}
      </ul>
    </div>
  );
};

AdditionalInfoWebsites.propTypes = {
  data: propTypes.object.isRequired,
};
