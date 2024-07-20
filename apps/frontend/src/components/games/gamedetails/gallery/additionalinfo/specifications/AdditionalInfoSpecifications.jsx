import propTypes from "prop-types";
import { CardBackground } from "../../../../../ui/cardBackground/CardBackground";
import { SpecificationsList } from "./list/SpecificationsList";
import { Tooltip } from "../../../../../ui/tooltip/Tooltip";
import { MediaList } from "../../../media/list/MediaList";

export const AdditionalInfoSpecifications = ({ keywordsData }) => {
  console.log(keywordsData);
  return (
    <CardBackground className="flex flex-col space-y-4 rounded-md border-2 border-gray-700 bg-base-100 bg-opacity-70 shadow-lg shadow-black md:col-span-1">
      <h3 className="text-center text-base uppercase tracking-wider text-blue-300 sm:text-sm md:text-lg">
        Sitios web
      </h3>
      {/*  <ul className="flex flex-wrap justify-center gap-4">
        {keywordsData ? (
          keywordsData.map(({ language }) => (
            <Tooltip key={language.id} text={language.name}>
              <MediaList id={language.id} name={language.name} />
            </Tooltip>
          ))
        ) : (
          <p className="text-pretty text-xs text-gray-400 md:text-base">
            No hay sitios web disponibles
          </p>
        )}
      </ul> */}
    </CardBackground>
  );
};

AdditionalInfoSpecifications.propTypes = {
  data: propTypes.object,
};
