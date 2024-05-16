import propTypes from "prop-types";
import { useForm } from "../../../../hooks/useForm";
import { InputSearch } from "../../../ui/index.js";
import { useSearchParameters } from "../../../../hooks/useSearchParameters.js";

export const GamesFinderSearch = ({ handleOnClearFilters }) => {
  const { searchParams, setParams, deleteParam } = useSearchParameters({
    search: "",
  });
  const { search, setFormData, handleOnChange } = useForm({
    search: searchParams.get("search"),
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    searchParams.delete("page");
    //* For now, we are not using the handleOnClearFilters function, but we will use it in the future.
    /*     handleOnClearFilters();
     */
    setParams({ search });
  };

  const handleOnReset = () => {
    setFormData({ search: "" });
    deleteParam("search");
  };
  return (
    <>
      <form onSubmit={handleOnSubmit} className="p-4">
        <InputSearch
          name="search"
          placeholder="Search for a game..."
          onChange={handleOnChange}
          value={search}
          className="border-t-info border-t-4 bg-base-200 focus:outline-none focus:ring-2 focus:ring-info focus:border-info focus:border-t-2 focus:border-b-2 transition-colors duration-500 p-2 mt-2 rounded-md"
        >
          <span
            className={`${searchParams.get("search") ? "block" : "hidden"}`}
            onClick={() => handleOnReset()}
          >
            X
          </span>
        </InputSearch>
      </form>
    </>
  );
};

GamesFinderSearch.propTypes = {
  handleOnClearFilters: propTypes.func.isRequired,
};
