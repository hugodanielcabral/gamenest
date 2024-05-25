import propTypes from "prop-types";
import { DateTime } from "luxon";
import { storeIcons } from "../../../../utils/getGameDetailsHeaderStoreIcons";
import { EXCLUDED_STORES_CATEGORY_ID } from "../../../../utils/constants";

export const GameDetailsHeader = ({ data }) => {
  const involvedCompanies = data?.involved_companies
    ? data?.involved_companies.find((company) => company.developer === true)
    : null;

  const timestamp = data?.first_release_date;
  const date = DateTime.fromSeconds(timestamp);
  const formattedDate = date.toFormat("yyyy");

  //* I'm filtering the external games to remove the excluded stores and then I'm removing the duplicates
  const filteredExternalStores = data?.external_games
    .filter((store) => {
      const filteredStore = !EXCLUDED_STORES_CATEGORY_ID.includes(
        store.category
      );

      return filteredStore;
    })
    .reduce((accumulator, currentValue) => {
      if (
        !accumulator.find((item) => item.category === currentValue.category)
      ) {
        accumulator.push(currentValue);
      }
      return accumulator;
    }, []);

  return (
    <div className="flex gap-y-2 md:flex-row flex-col items-center gap-x-20">
      <div className="grow">
        <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-center md:text-left text-white font-bold">
          {data?.name}
        </h1>
        <h3 className="text-base sm:text-lg md:text-xl lg:text-xl md:text-left text-center text-info">
          {involvedCompanies && involvedCompanies.company.name + " -"}{" "}
          {formattedDate}
        </h3>
      </div>
      {/*  <div className="flex gap-3 justify-center grow flex-row md:flex-col items-center">
        <h2 className="text-gray-200 text-base sm:text-lg md:text-xl lg:text-2xl">
          {filteredExternalStores.length > 1 && "Available on:"}
        </h2>
        <div className="flex gap-3">
          {filteredExternalStores.map((game) => {
            const storeIcon = storeIcons.find(
              (icon) => icon.igdbCategory === game.category
            );
            return (
              <a
                key={game.id}
                href={
                  storeIcon.name === "Steam"
                    ? `https://store.steampowered.com/app/${game.uid}`
                    : game.url
                }
                target="_blank"
                rel="noreferrer"
                className="hover:scale-110 transition-transform duration-300 ease-in-out"
              >
                <img
                  src={storeIcon.icon}
                  alt={storeIcon.name}
                  className="size-6 md:size-6 lg:size-8"
                />
              </a>
            );
          }) || <p>No stores available.</p>}
        </div>
      </div> */}
    </div>
  );
};

GameDetailsHeader.propTypes = {
  data: propTypes.object.isRequired,
};
