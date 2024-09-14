import { useState, useEffect } from "react";
import { useQueryParams } from "../../../../hooks/useQueryParams";

export const GamesFinderSearch = () => {
  const { query, navigate, searchParams, clearParams, setParams } =
    useQueryParams();
  const [inputSearch, setInputSearch] = useState(query.q as string);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };

  const handleOnInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === "" && query.q) {
      clearParams(["page", "q"]);
      navigate(`?${searchParams.toString()}`);
    }
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputSearch.trim().length <= 1) return;
    clearParams("page");
    setParams("q", inputSearch);
  };

  useEffect(() => {
    setInputSearch(query.q as string);
  }, [query.q]);

  return (
    <form onSubmit={handleOnSubmit} className="flex-grow">
      <input
        type="search"
        placeholder="Buscar juego..."
        value={inputSearch}
        onChange={handleOnChange}
        onInput={handleOnInput}
        name="q"
        minLength={2}
        maxLength={50}
        className="input input-bordered input-xs w-full bg-base-300 sm:input-sm md:input-md lg:input-lg focus:border-2 focus:border-info"
      />
    </form>
  );
};
