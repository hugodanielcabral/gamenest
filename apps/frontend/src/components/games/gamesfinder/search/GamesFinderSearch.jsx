import propTypes from "prop-types";
import { useForm } from "../../../../hooks/useForm";
import { InputSearch } from "../../../ui/index.js";
import { useSearchParameters } from "../../../../hooks/useSearchParameters.js";

export const GamesFinderSearch = ({ handleOnClearFilters }) => {
  const { searchParams, setParams, deleteParam } = useSearchParameters({
    search: "",
  });
  useSearchParameters();
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
