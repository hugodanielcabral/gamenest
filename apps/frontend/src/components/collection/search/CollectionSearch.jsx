import propTypes from "prop-types";
import { useState } from "react";

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
        <label className="input input-bordered flex items-center gap-2 ">
          <span
            className={`${searchParams.get("search") ? "block" : "hidden"}`}
            onClick={() => handleOnReset()}
          >
            X
          </span>
          <input
            type="text"
            className="grow"
            placeholder="Search for a game"
            value={searchValue}
            onChange={handleSearch}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </form>
    </>
  );
};

CollectionSearch.propTypes = {
  setSearch: propTypes.func.isRequired,
  searchParams: propTypes.object.isRequired,
  setSearchParams: propTypes.func.isRequired,
};
