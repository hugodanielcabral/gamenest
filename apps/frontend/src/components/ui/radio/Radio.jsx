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
        `form-control w-20 rounded-md bg-base-200 sm:h-16 sm:w-24 md:h-20 md:w-28 ${className}`,
        {
          "border-2 border-info transition-colors duration-700":
            selectedOption === option.name,
          "border-2 border-gray-500 transition-colors duration-500 hover:border-2 hover:border-info":
            selectedOption !== option.name,
        },
      )}
    >
      <label className="label cursor-pointer">
        <span className="label-text flex w-full flex-col items-center justify-center gap-2 font-bold text-white">
          <img
            src={option.iconId}
            alt={`${option.name} icon`}
            className="size-6 object-cover opacity-70 md:size-8"
          />
          <p className="text-nowrap text-xs sm:text-sm md:text-base">
            {option.title}
          </p>
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
