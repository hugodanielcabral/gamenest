import propTypes from "prop-types";
import { DateTime } from "luxon";
import { Tooltip } from "../../../ui/tooltip/Tooltip";

export const GameDetailsHeader = ({ data }) => {
  const involvedCompanies = data?.involved_companies
    ? data?.involved_companies.find((company) => company.developer === true)
    : null;

  const gameTimeStamp = data?.first_release_date;

  const formattedDate = gameTimeStamp
    ? DateTime.fromSeconds(gameTimeStamp).toLocaleString(DateTime.DATE_FULL)
    : "TBA";

  return (
    <div className="flex flex-col items-center gap-x-20 gap-y-2 md:flex-col">
      <h1 className="text-pretty text-center text-base text-white sm:text-2xl md:text-left md:text-3xl lg:text-4xl">
        {data?.name}
      </h1>
      <h3 className="text-center text-sm text-info sm:text-lg md:text-left md:text-xl lg:text-xl">
        {involvedCompanies && involvedCompanies.company.name + " -"}{" "}
        {formattedDate}
      </h3>
      <ul className="flex flex-wrap justify-center gap-4 *:text-sm *:text-white *:md:text-lg">
        {data?.platforms ? (
          data.platforms.map((platform) => (
            <Tooltip key={platform.id} text={platform.name}>
              {platform.abbreviation}
            </Tooltip>
          ))
        ) : (
          <p className="text-pretty text-gray-400">
            No hay plataformas disponibles
          </p>
        )}
      </ul>
    </div>
  );
};

GameDetailsHeader.propTypes = {
  data: propTypes.object.isRequired,
};

GameDetailsHeader.defaultProps = {
  data: {},
};
