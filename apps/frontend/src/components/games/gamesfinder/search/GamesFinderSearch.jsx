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
        <div className="relative w-full">
          <InputSearch
            name="search"
            placeholder="Buscar juegos..."
            onChange={handleOnChange}
            value={search}
            className="mt-2 rounded-md bg-base-100 p-2"
          ></InputSearch>

          {urlSearchParams.get("search") && (
            <div className="mt-4 flex items-center justify-center gap-x-8">
              <Button
                type="button"
                className="ml-2 bg-red-500 hover:bg-red-600"
                onClick={() => {
                  clearQueryParamAndNavigate("search");
                  setFormData({
                    search: "",
                  });
                }}
              >
                Limpiar busqueda: {`"${urlSearchParams.get("search")}"`}
              </Button>
            </div>
          )}
        </div>
      </form>
    </>
  );
};
