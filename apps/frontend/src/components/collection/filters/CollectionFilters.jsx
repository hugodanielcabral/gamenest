import { useUpdateUrlAndNavigate } from "../../../hooks/useUpdateUrlAndNavigate";
import { Modal } from "../../ui";
import { FiltersCard } from "./card/FiltersCard";
import { useMultiSelect } from "../../../hooks/useMultiSelect";
import propTypes from "prop-types";

export const CollectionFilters = ({ filtersData, modalOpen, setModalOpen }) => {
  const { urlSearchParams, clearAllQueryParamsAndNavigate } =
    useUpdateUrlAndNavigate();

  const { selectedOptions, handleOnChange, setSelectedOptions } =
    useMultiSelect({
      status: urlSearchParams.get("status")?.split(",").filter(Boolean) || [],
      ownership:
        urlSearchParams.get("ownership")?.split(",").filter(Boolean) || [],
    });

  const clearAll = () => {
    clearAllQueryParamsAndNavigate();
    setSelectedOptions({ status: [], ownership: [] });
  };

  return (
    <>
      <div className="hidden sm:hidden md:block">
        <FiltersCard
          selectedOptions={selectedOptions}
          handleOnChange={handleOnChange}
          filtersData={filtersData}
          clearAll={clearAll}
        />
      </div>
      {modalOpen && (
        <div className="block md:hidden">
          <Modal
            isOpen={modalOpen}
            hasCloseBtn={true}
            onClose={() => setModalOpen(false)}
          >
            <FiltersCard
              selectedOptions={selectedOptions}
              handleOnChange={handleOnChange}
              filtersData={filtersData}
              clearAll={clearAll}
            />
          </Modal>
        </div>
      )}
    </>
  );
};

CollectionFilters.propTypes = {
  filtersData: propTypes.object.isRequired,
  modalOpen: propTypes.bool.isRequired,
  setModalOpen: propTypes.func.isRequired,
};

CollectionFilters.defaultProps = {
  filtersData: {},
  modalOpen: false,
  setModalOpen: () => {},
};
