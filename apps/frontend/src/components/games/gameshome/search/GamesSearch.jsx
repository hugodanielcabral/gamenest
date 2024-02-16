import { useState } from "react";
import { useSearchParamsQuery } from "../../../../hooks/useSearchParamsQuery";
import { SearchForm } from "./searchform/SearchForm";
import "./GamesSearch.css";

export const GamesSearch = () => {
  const { addQueryParam, deleteQueryParam } = useSearchParamsQuery();
  const [inputSearchValue, setInputSearchValue] = useState("");

  const onInputChange = ({ target }) => {
    setInputSearchValue(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputSearchValue, "inputsearchvalue");
    addQueryParam("gamename", inputSearchValue);
  };

  return (
    <div className="relative">
      <SearchForm
        handleSubmit={handleSubmit}
        onInputChange={onInputChange}
        deleteQueryParam={deleteQueryParam}
        inputSearchValue={inputSearchValue}
        setInputSearchValue={setInputSearchValue}
      />
    </div>
  );
};
