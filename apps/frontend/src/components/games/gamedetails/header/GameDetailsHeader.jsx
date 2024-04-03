import propTypes from "prop-types";
import { DateTime } from "luxon";

export const GameDetailsHeader = ({ data }) => {
  const involvedCompanies = data?.involved_companies
    ? data?.involved_companies.find((company) => company.developer === true)
    : null;
  return (
    <div>
      <h1 className="text-4xl md:text-6xl text-center md:text-left text-white">
        {data?.name}
      </h1>
      <h3 className="text-xl md:text-2xl md:text-left text-center">
        {involvedCompanies && involvedCompanies.company.name} -{" "}
        {DateTime.fromObject(data?.first_release_date).year}
      </h3>
    </div>
  );
};

GameDetailsHeader.propTypes = {
  data: propTypes.object.isRequired,
};
