import propTypes from "prop-types";
import { Select, Option } from "../../../ui/index.js";
import { ORDERBY_VALUES } from "../../../../utils/constants";

export const SearchOrderBy = ({ handleOnChange, orderBy }) => {
  return (
    <div className="flex-grow basis-44 text-white">
      <Select
        id="orderBy"
        name="orderBy"
        onChange={handleOnChange}
        value={orderBy}
        className="border-0 text-xs text-gray-300"
      >
        {ORDERBY_VALUES.map((orderValue) => (
          <Option
            key={orderValue.id}
            value={orderValue.value}
            disabled={orderValue.value === ""}
          >
            {orderValue.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};

SearchOrderBy.propTypes = {
  handleOnChange: propTypes.func.isRequired,
  orderBy: propTypes.string.isRequired,
};

SearchOrderBy.defaultProps = {
  handleOnChange: () => {},
  orderBy: "",
};
