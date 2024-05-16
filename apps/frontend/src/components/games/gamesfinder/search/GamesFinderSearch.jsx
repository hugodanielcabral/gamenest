import { useForm } from "../../../../hooks/useForm";
import { Button, InputSearch } from "../../../ui/index.js";
import { useUpdateUrlAndNavigate } from "../../../../hooks/useUpdateUrlAndNavigate.js";

export const GamesFinderSearch = () => {
  const { urlSearchParams, updateUrlAndNavigate, clearQueryParamAndNavigate } =
    useUpdateUrlAndNavigate();

  const { search, setFormData, handleOnChange } = useForm({
    search: urlSearchParams.get("search") || "",
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    updateUrlAndNavigate({
      search: search,
    });
    clearQueryParamAndNavigate("page");
  };

  return (
    <>
      <form onSubmit={handleOnSubmit} className="p-4">
        <div className="w-full relative">
          <InputSearch
            name="search"
            placeholder="Search for a game..."
            onChange={handleOnChange}
            value={search}
            className="border-t-info border-t-4 bg-base-200 focus:outline-none focus:ring-2 focus:ring-info focus:border-info focus:border-t-2 focus:border-b-2 transition-colors duration-500 p-2 mt-2 rounded-md"
          ></InputSearch>
          {urlSearchParams.get("search") && (
            <Button
              type="button"
              className="absolute bottom-0 right-5 bg-transparent hover:bg-transparent px-0 text-error font-bold"
              onClick={() => {
                clearQueryParamAndNavigate("search");
                setFormData({
                  search: "",
                });
              }}
            >
              X
            </Button>
          )}
        </div>
      </form>
    </>
  );
};
