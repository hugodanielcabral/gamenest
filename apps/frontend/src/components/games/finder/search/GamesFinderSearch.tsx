import queryString from "query-string";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

export const GamesFinderSearch = () => {
  const { search } = useLocation();
  const { q = "" } = queryString.parse(search);
  const [inputSearch, setInputSearch] = useState(q as string);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };

  const handleOnInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === "" && q) {
      const searchQuery = new URLSearchParams(searchParams);
      searchQuery.delete("q");
      searchQuery.delete("page");
      navigate(`?${searchQuery.toString()}`);
    }
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputSearch.trim().length <= 1) return;
    const searchQuery = new URLSearchParams(searchParams);
    searchQuery.delete("page");
    searchQuery.set("q", inputSearch);
    navigate(`?${searchQuery.toString()}`);
  };

  useEffect(() => {
    setInputSearch(q as string);
  }, [q]);

  return (
    <form onSubmit={handleOnSubmit} className="w-full flex justify-center">
      <input
        type="search"
        placeholder="Buscar juego..."
        value={inputSearch}
        onChange={handleOnChange}
        onInput={handleOnInput}
        name="q"
        minLength={2}
        maxLength={50}
        className="input input-bordered input-xs w-full max-w-lg sm:input-sm md:input-md focus:border-info focus:border-2 lg:input-lg"
      />
    </form>
  );
};
