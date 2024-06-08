import clsx from "clsx";
import { Label } from "../../../ui/label/Label";
import { Option } from "../../../ui/option/Option";

interface FormSelectProps {
  editMode: boolean;
  labelText: string;
  value: string;
  name: string;
  options: { id: number; name: string }[];
  handleOnChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const FormSelect = ({
  editMode,
  labelText,
  value,
  name,
  options,
  handleOnChange,
}:FormSelectProps) => {
  return editMode ? (
    <Label className={"mb-2 input input-bordered"}>
      {labelText}: <span className="text-white">{value}</span>
    </Label>
  ) : (
    <select
      name={name}
      className={clsx(
        /*   {
                "border-2 border-error":
                  errors && errors.some((err) => err.path == "country_id"),
                "border-0":
                  errors && !errors.some((err) => err.path == "country_id"),
              }, */
        "mb-2 select select-bordered select-md"
      )}
      onChange={handleOnChange}
      value={value}
    >
      <option disabled value="">
        Seleccione un {labelText}
      </option>
      {options.map((opt) => (
        <Option key={opt.id} value={opt.id}>
          {opt.name}
        </Option>
      ))}
    </select>
  );
};
