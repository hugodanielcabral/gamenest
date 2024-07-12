import propTypes from "prop-types";
import { useEffect, useState } from "react";
import { useUpdateUrlAndNavigate } from "../../../hooks/useUpdateUrlAndNavigate";
import { FiltersCard } from "./card/FiltersCard";
import { useMultiSelect } from "../../../hooks/useMultiSelect";

export const CollectionFilters = ({ filtersData }) => {
  const { urlSearchParams, clearAllQueryParamsAndNavigate } =
    useUpdateUrlAndNavigate();

  const { selectedOptions, handleOnChange, setSelectedOptions } =
    useMultiSelect({
      status: urlSearchParams.get("status")?.split(",").filter(Boolean) || [],
      ownership:
        urlSearchParams.get("ownership")?.split(",").filter(Boolean) || [],
    });

  const [drawerOpen, setDrawerOpen] = useState(false);

  const clearAll = () => {
    clearAllQueryParamsAndNavigate();
    setSelectedOptions({ status: [], ownership: [] });
  };

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <div className="drawer z-10">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        onChange={() => setDrawerOpen(!drawerOpen)}
      />
      <div className="drawer-content">
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
          Filtros
        </label>
      </div>
      <div className="drawer-side overflow-hidden">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu mt-28 min-h-full w-80 bg-base-200 p-4 text-base-content">
          <FiltersCard
            selectedOptions={selectedOptions}
            handleOnChange={handleOnChange}
            filtersData={filtersData}
            clearAll={clearAll}
          />
        </ul>
      </div>
    </div>
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
