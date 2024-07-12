import propTypes from "prop-types";
import { Fragment } from "react";
import { FilterItem } from "../item/FilterItem";
import { GAME_STATUS } from "../../../../utils/constants";

export const FiltersCard = ({
  selectedOptions,
  handleOnChange,
  filtersData,
  clearAll,
}) => {
  return (
    <div className="h-fit overflow-auto">
      {selectedOptions.status.length > 0 ||
      selectedOptions.ownership.length > 0 ? (
        <button
          className="mt-2 w-full rounded-md bg-error p-2 text-white transition-all duration-200 ease-in-out hover:bg-opacity-70"
          onClick={clearAll}
        >
          Limpiar filtros
        </button>
      ) : null}
      <h2 className="divider text-center text-2xl text-white">Estado</h2>
      {GAME_STATUS.map((statusValue) => (
        <Fragment key={statusValue.id}>
          <FilterItem
            name="status"
            value={statusValue.name}
            handleOnChange={handleOnChange}
            isChecked={selectedOptions.status.includes(statusValue.name)}
            className="border-transparent text-gray-300"
          />
        </Fragment>
      ))}

      {filtersData?.ownership?.length > 0 && (
        <>
          <h2 className="divider text-center text-2xl text-white">Propiedad</h2>
          {filtersData?.ownership.map((ownershipValue) => (
            <Fragment key={ownershipValue.ownership_name}>
              <FilterItem
                name="ownership"
                value={ownershipValue.ownership_name}
                handleOnChange={handleOnChange}
                isChecked={selectedOptions.ownership.includes(
                  ownershipValue.ownership_name,
                )}
                className="border-transparent text-gray-300"
              />
            </Fragment>
          ))}
        </>
      )}
    </div>
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
