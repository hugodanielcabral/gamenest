import { Label } from "../../../../ui/label/Label.tsx";
import { Radio } from "../../../../ui/radio/Radio.tsx";

interface OptionGroupProps {
  title: string;
  options: { id: number; title: string; value: string }[];
  name: string;
  selectedValue: string;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: string;
}

export const OptionGroup = ({
  title,
  options,
  name,
  selectedValue,
  handleOnChange,
}: OptionGroupProps) => {
  return (
    <div className="relative">
      <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-400">
        {title}
      </h3>
      {options.map((option) => (
        <div key={option.id} className="form-control">
          <Label title={option.title}>
            <Radio
              name={name}
              value={option.value}
              onChange={handleOnChange}
              checked={selectedValue === option.value}
            />
          </Label>
        </div>
      ))}
    </div>
  );
};
