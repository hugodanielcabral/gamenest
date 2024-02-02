import { useState } from "react";
import propTypes from "prop-types";

export const GamesSearch = ({ handleGameNameChange }) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGameNameChange(searchValue);
        }}
      >
        <input
          type="search"
          className="w-full input input-bordered bg-grey-color text-black-color"
          placeholder="Search game..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </form>
    </div>
  );
};

GamesSearch.propTypes = {
  handleGameNameChange: propTypes.func.isRequired,
};
