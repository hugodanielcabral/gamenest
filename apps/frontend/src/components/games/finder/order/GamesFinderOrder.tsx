import { Option, Select } from "../../../ui/select/Select.tsx";
import { useState } from "react";
import { useQueryParams } from "../../../../hooks/useQueryParams.tsx";

const orderOptions = [
  { value: "desc", text: "Descendente" },
  { value: "asc", text: "Ascendente" },
];

export const GamesFinderOrder = () => {
  const { query, clearParams, setParams } = useQueryParams();
  const [inputOrder, setInputOrder] = useState(query.order as string);

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputOrder(e.target.value);

    clearParams("page");
    setParams("order", e.target.value);
  };

  return (
    <>
      {query?.q ? (
        <Select className="max-w-44 bg-base-300 lg:select-lg" disabled={true}>
          <Option value="asc" text="Ascendente" />
        </Select>
      ) : (
        <Select
          className="max-w-44 bg-base-300 lg:select-lg focus:border-2 focus:border-info"
          value={inputOrder}
          onChange={handleOnChange}
        >
          <Option value="" text="Ordenar" disabled />

          {orderOptions.map((option) => (
            <Option
              key={option.value}
              value={option.value}
              text={option.text}
            />
          ))}
        </Select>
      )}
    </>
  );
};
