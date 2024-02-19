import { useState } from "react";
import { SearchForm } from "./searchform/SearchForm";
import "./GamesSearch.css";
import { useSearchParams } from "react-router-dom";

export const GamesSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputSearchValue, setInputSearchValue] = useState("");

  const onInputChange = ({ target }) => {
    setInputSearchValue(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete("page");
    newSearchParams.set("gamename", inputSearchValue);
    setSearchParams(newSearchParams);
  };

  const handleResetQueries = () => {
    const newSearchParams = new URLSearchParams();
    for (const [key] of searchParams.entries()) {
      newSearchParams.delete(key);
    }
    setSearchParams(newSearchParams);
  };

  return (
    <div className="relative">
      <SearchForm
        handleSubmit={handleSubmit}
        onInputChange={onInputChange}
        inputSearchValue={inputSearchValue}
        setInputSearchValue={setInputSearchValue}
        handleResetQueries={handleResetQueries}
      />
    </div>
  );
};
