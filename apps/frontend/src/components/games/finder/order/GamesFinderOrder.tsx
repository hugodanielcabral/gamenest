import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Option, Select } from "../../../ui/select/Select.tsx";
import queryString from "query-string";
import { useState } from "react";

const orderOptions = [
  { value: "asc", text: "Ascendente" },
  { value: "desc", text: "Descendente" },
];

export const GamesFinderOrder = () => {
  const { search } = useLocation();
  const { order = "", q = "" } = queryString.parse(search);
  const [inputOrder, setInputOrder] = useState(order as string);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputOrder(e.target.value);

    const searchQuery = new URLSearchParams(searchParams);
    searchQuery.delete("page");
    searchQuery.set("order", e.target.value);
    navigate(`?${searchQuery.toString()}`);
  };

  return (
    <>
      {q ? (
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
