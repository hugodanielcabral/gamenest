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
      className="col-span-4 md:col-span-3 text-xl"
    >
      <form
        onSubmit={handleSearchSubmit}
        className="flex items-center justify-center"
      >
        <div className="w-full relative">
          <InputSearch
            name="search"
            placeholder="Search for a game"
            className="border-t-info border-t-4 bg-base-200 focus:outline-none focus:ring-2 focus:ring-info focus:border-info focus:border-t-2 focus:border-b-2 transition-colors duration-500 p-2 mt-2 rounded-md"
            onChange={handleOnChange}
            value={search}
          ></InputSearch>
          {urlSearchParams.get("search") && (
            <Button
              type="button"
              className="absolute bottom-0 right-5 bg-transparent hover:bg-transparent px-0 text-error font-bold"
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
