import propTypes from "prop-types";
import { Checkbox, Label } from "../../../ui/index.js";

export const FilterItem = ({
  name,
  value,
  handleOnChange,
  isChecked,
  className,
}) => {
  return (
    <Label
      htmlFor={value}
      className={className + "flex justify-between bg-transparent"}
    >
      {value}
      <Checkbox
        name={name}
        id={value}
        value={value}
        onChange={handleOnChange}
        checked={isChecked ? true : false}
      />
    </Label>
  );
};

FilterItem.propTypes = {
  name: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  handleOnChange: propTypes.func.isRequired,
  isChecked: propTypes.bool.isRequired,
  className: propTypes.string,
};

FilterItem.defaultProps = {
  name: "",
  value: "",
  handleOnChange: () => {},
  isChecked: false,
  className: "",
};
