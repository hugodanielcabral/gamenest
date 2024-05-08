import propTypes from "prop-types";
import { Select, Option } from "../../../ui/index.js";
import { SORT_VALUES } from "../../../../utils/constants";

export const SearchSort = ({ sort, handleOnChange }) => {
  return (
    <div className="basis-32 text-white">
      <Select id="sort" name="sort" onChange={handleOnChange} value={sort}>
        {SORT_VALUES.map((sortValue) => (
          <Option
            key={sortValue.id}
            value={sortValue.value}
            disabled={sortValue.value === ""}
          >
            {sortValue.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};

SearchSort.propTypes = {
  handleOnChange: propTypes.func.isRequired,
  sort: propTypes.string.isRequired,
};

SearchSort.defaultProps = {
  handleOnChange: () => {},
  sort: "",
};
