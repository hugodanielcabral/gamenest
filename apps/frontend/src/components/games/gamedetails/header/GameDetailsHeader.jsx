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
      <h1 className="text-pretty text-center text-xl text-blue-400 sm:text-2xl md:text-left md:text-3xl lg:text-4xl xl:text-5xl">
        {data?.name}
      </h1>
      <h3 className="text-pretty text-center text-lg text-gray-300 sm:text-xl md:text-left md:text-2xl lg:text-3xl">
        {involvedCompanies && involvedCompanies.company.name + " -"}{" "}
        {formattedDate}
      </h3>
      <ul className="mx-auto flex min-w-80 flex-wrap justify-center gap-4 rounded-md border-2 border-gray-700 bg-base-100 bg-opacity-60 p-4 *:text-sm *:text-blue-400 *:sm:text-base *:md:text-lg *:lg:text-xl">
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
