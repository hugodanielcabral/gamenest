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
      <h3 className="text-base text-center md:text-left sm:text-lg md:text-xl text-white">
        {title}
      </h3>
      <div className="mx-auto md:mx-0.5 self-center max-w-[300px] w-[220px]">
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
