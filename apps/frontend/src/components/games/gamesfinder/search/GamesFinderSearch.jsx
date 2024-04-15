import { useForm } from "../../../../hooks/useForm";
import { InputSearch } from "../../../ui/index.js";
import { useSearchParameters } from "../../../../hooks/useSearchParameters.js";

export const GamesFinderSearch = () => {
  //! Cuando hay un valor en la URL y recargo la pagina, no se coloca otra vez en el input

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
