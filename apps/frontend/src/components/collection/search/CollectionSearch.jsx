import { Button, InputSearch } from "../../ui/index.js";
import { useForm } from "../../../hooks/useForm";
import { useEffect } from "react";
import { useUpdateUrlAndNavigate } from "../../../hooks/useUpdateUrlAndNavigate";
import { SearchOrderBy } from "./orderBy/SearchOrderBy.jsx";
import { SearchSort } from "./sort/SearchSort.jsx";

export const CollectionSearch = () => {
  const { updateUrlAndNavigate, clearQueryParamAndNavigate, urlSearchParams } =
    useUpdateUrlAndNavigate();

  const { search, orderBy, sort, handleOnChange, setFormData, formData } =
    useForm({
      search: urlSearchParams.get("search") || "",
      orderBy: urlSearchParams.get("orderBy") || "",
      sort: urlSearchParams.get("sort") || "",
    });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateUrlAndNavigate({
      search: search,
    });
    clearQueryParamAndNavigate("page");
  };

  useEffect(() => {
    updateUrlAndNavigate({
      orderBy: orderBy,
      sort: sort,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderBy, sort]);

  return (
    <section
      aria-label="Collection Search"
      className="col-span-4 text-xl md:col-span-4"
    >
      <form
        onSubmit={handleSearchSubmit}
        className="flex items-center justify-center"
      >
        <div className="relative w-full">
          <InputSearch
            name="search"
            placeholder="Buscar juegos..."
            className="mt-2 rounded-md bg-base-100 p-2 transition-colors duration-500"
            onChange={handleOnChange}
            value={search}
          ></InputSearch>
          {urlSearchParams.get("search") && (
            <Button
              type="button"
              className="absolute bottom-0 right-5 bg-transparent px-0 font-bold text-error hover:bg-transparent"
              onClick={() => {
                clearQueryParamAndNavigate("search");
                setFormData({
                  ...formData,
                  search: "",
                });
              }}
            >
              X
            </Button>
          )}
        </div>
        <SearchOrderBy handleOnChange={handleOnChange} orderBy={orderBy} />
        {orderBy && <SearchSort handleOnChange={handleOnChange} sort={sort} />}
      </form>
    </section>
  );
};
