import propTypes from "prop-types";
import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import "./GamesSearch.css";

export const GamesSearch = ({
  handleQueryNameChange,
  params,
  handleResetSearch,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const gameNameParams = params.searchParams.get("gamename");

  useEffect(() => {
    setSearchValue(gameNameParams || "");
  }, [gameNameParams]);

  return (
    <div className="relative">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleQueryNameChange("gamename", searchValue);
        }}
      >
        <div className="relative">
          <input
            type="search"
            className="w-full pl-10 pr-4 font-bold rounded-none shadow-lg input input-bordered bg-base-300 text-base-content focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-base-100 focus:ring-opacity-50"
            placeholder="Search game..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {gameNameParams && (
            <button
              type="button"
              className="reset absolute top-0 right-0 px-4 py-1 mt-[6px] mr-2 text-lg font-bold text-white rounded-sm bg-error hover:bg-error/75"
              onClick={() => {
                handleResetSearch();
              }}
            >
              X
            </button>
          )}
        </div>
        <button type="submit" className="absolute top-0 left-0 p-2 mt-2 ml-2 ">
          <IoMdSearch />
        </button>
      </form>
    </div>
  );
};

GamesSearch.propTypes = {
  handleQueryNameChange: propTypes.func.isRequired,
  params: propTypes.object.isRequired,
  handleResetSearch: propTypes.func.isRequired,
};
