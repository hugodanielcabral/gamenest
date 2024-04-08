import propTypes from "prop-types";
import { DateTime } from "luxon";
import { storeIcons } from "../../../../utils/getGameDetailsHeaderStoreIcons";
import { EXCLUDED_STORES_CATEGORY_ID } from "../../../../utils/constants";

export const GameDetailsHeader = ({ data }) => {
  const involvedCompanies = data?.involved_companies
    ? data?.involved_companies.find((company) => company.developer === true)
    : null;

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
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-center md:text-left text-white">
          {data?.name}
        </h1>
        <h3 className="text-lg md:text-xl lg:text-2xl md:text-left text-center text-info font-semibold">
          {involvedCompanies && involvedCompanies.company.name} -{" "}
          {DateTime.fromObject(data?.first_release_date).year}
        </h3>
      </div>
      <div className="flex gap-3 justify-center grow flex-col items-center">
        <h2 className="text-white text-base md:text-1xl lg:text-2xl">
          Buy this game on:
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
      </div>
    </div>
  );
};

GameDetailsHeader.propTypes = {
  data: propTypes.object.isRequired,
};
