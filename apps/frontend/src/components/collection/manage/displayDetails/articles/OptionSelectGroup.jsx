import propTypes from "prop-types";
import { Select } from "../../../../ui/select/Select";

export const OptionSelectGroup = ({
  title,
  name,
  handleOnChange,
  value,
  options,
}) => {
  return (
    <section>
      <h3 className="text-lg text-white">{title}</h3>
      <div className="self-center max-w-[300px] w-[220px]">
        <Select name={name} onChange={handleOnChange} value={value} id={name}>
          {options.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
        </Select>
      </div>
    </section>
  );
};

OptionSelectGroup.propTypes = {
  title: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  handleOnChange: propTypes.func.isRequired,
  value: propTypes.string.isRequired,
  options: propTypes.array.isRequired,
};
