import { Fragment } from "react";
import { CardBackground } from "../../list/card";
import { FilterItem } from "../item/FilterItem";
import propTypes from "prop-types";
import { GAME_STATUS } from "../../../../utils/constants";

export const FiltersCard = ({
  selectedOptions,
  handleOnChange,
  filtersData,
  clearAll,
}) => {
  return (
    <CardBackground className="h-fit border-r-4 border-r-info overflow-auto">
      {selectedOptions.status.length > 0 ||
      selectedOptions.ownership.length > 0 ? (
        <button
          className="w-full bg-error text-white p-2 rounded-md mt-2 hover:bg-opacity-70 transition-all duration-200 ease-in-out"
          onClick={clearAll}
        >
          Limpiar filtros
        </button>
      ) : null}
      <h2 className="text-2xl text-white text-center divider">Estado</h2>
      {GAME_STATUS.map((statusValue) => (
        <Fragment key={statusValue.id}>
          <FilterItem
            name="status"
            value={statusValue.name}
            handleOnChange={handleOnChange}
            isChecked={selectedOptions.status.includes(statusValue.name)}
            className="border-transparent  text-gray-300"
          />
        </Fragment>
      ))}

      {filtersData.ownership.length > 0 && (
        <>
          <h2 className="text-2xl text-white text-center divider">Propiedad</h2>
          {filtersData?.ownership.map((ownershipValue) => (
            <Fragment key={ownershipValue.ownership_name}>
              <FilterItem
                name="ownership"
                value={ownershipValue.ownership_name}
                handleOnChange={handleOnChange}
                isChecked={selectedOptions.ownership.includes(
                  ownershipValue.ownership_name
                )}
                className="border-transparent text-gray-300"
              />
            </Fragment>
          ))}
        </>
      )}
    </CardBackground>
  );
};

FiltersCard.propTypes = {
  selectedOptions: propTypes.object.isRequired,
  handleOnChange: propTypes.func.isRequired,
  filtersData: propTypes.object.isRequired,
  clearAll: propTypes.func.isRequired,
};

FiltersCard.defaultProps = {
  selectedOptions: {},
  handleOnChange: () => {},
  filtersData: {},
  clearAll: () => {},
};
