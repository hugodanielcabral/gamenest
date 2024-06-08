import propTypes from "prop-types";
import clsx from "clsx";

export const Radio = ({
  option,
  selectedOption,
  handleOnChange,
  name,
  className,
}) => {
  return (
    <div
      className={clsx(
        `form-control w-24 md:w-32 h-20 bg-base-200 rounded-md ${className}`,
        {
          "border-2 border-info transition-colors duration-700":
            selectedOption === option.name,
          "border-gray-500 border-2 hover:border-2 transition-colors duration-500 hover:border-info":
            selectedOption !== option.name,
        }
      )}
    >
      <label className="label cursor-pointer">
        <span className="label-text flex-col flex gap-2 items-center justify-center w-full text-white font-bold">
          <img
            src={option.iconId}
            alt={`${option.name} icon`}
            className="w-8 h-8 object-cover"
          />
          <p className="text-nowrap text-sm">{option.title}</p>
        </span>
        <input
          type="radio"
          name={name}
          className="radio radio-mark"
          value={option.name}
          onChange={handleOnChange}
        />
      </label>
    </div>
  );
};

Radio.propTypes = {
  option: propTypes.object.isRequired,
  selectedOption: propTypes.string.isRequired,
  handleOnChange: propTypes.func.isRequired,
  name: propTypes.string.isRequired,
  className: propTypes.string,
};

Radio.defaultProps = {
  option: {},
  selectedOption: "",
  handleOnChange: () => {},
  name: "",
  className: "",
};
