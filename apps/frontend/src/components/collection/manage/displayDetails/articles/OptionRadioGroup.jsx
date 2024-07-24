import propTypes from "prop-types";
import { Radio } from "../../../../ui/radio/Radio";

export const OptionRadioGroup = ({
  title,
  options,
  selectedOption,
  handleOnChange,
  name,
}) => {
  return (
    <article className="col-span-6 space-y-2 md:col-span-3 lg:col-span-2">
      <h3 className="text-center text-base text-white sm:text-lg md:text-xl lg:text-left">
        {title}
      </h3>
      <div className={`flex flex-wrap justify-center gap-2 lg:justify-start`}>
        {options.map((option) => (
          <Radio
            key={option.id}
            option={option}
            selectedOption={selectedOption}
            handleOnChange={handleOnChange}
            name={name}
          />
        ))}
      </div>
    </article>
  );
};

OptionRadioGroup.propTypes = {
  title: propTypes.string.isRequired,
  options: propTypes.array.isRequired,
  selectedOption: propTypes.string.isRequired,
  handleOnChange: propTypes.func.isRequired,
  name: propTypes.string.isRequired,
};

OptionRadioGroup.defaultProps = {
  title: "",
  options: [],
  selectedOption: "",
  name: "",
};
