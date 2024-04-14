import propTypes from "prop-types";
import { useState } from "react";
import { InputSearch } from "../../ui/index.js";

export const CollectionSearch = ({
  setSearch,
  searchParams,
  setSearchParams,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setSearch(searchValue);

    //* Create a new URLSearchParams object so i can reset the search params
    searchParams = new URLSearchParams();

    searchParams.set("search", searchValue);
    setSearchParams(searchParams);
  };

  const handleOnReset = () => {
    setSearchValue("");
    setSearch("");
    searchParams = new URLSearchParams();
    setSearchParams(searchParams);
  };

  return (
    <>
      <form onSubmit={handleOnSubmit} className="col-span-2">
        <InputSearch
          placeholder="Search for a game"
          value={searchValue}
          onChange={handleSearch}
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

CollectionSearch.propTypes = {
  setSearch: propTypes.func.isRequired,
  searchParams: propTypes.object.isRequired,
  setSearchParams: propTypes.func.isRequired,
};
