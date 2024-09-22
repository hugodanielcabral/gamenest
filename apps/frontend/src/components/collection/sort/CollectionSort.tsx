import { useEffect, useState } from "react";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { Option, Select } from "../../ui/select/Select.tsx";

interface SortOptions {
  value:
    | "rating"
    | "game_name"
    | "is_favorite"
    | "status_name"
    | "ownership_name"
    | "hours_played"
    | "minutes_played";
  text:
    | "Rating"
    | "Nombre"
    | "Favoritos"
    | "Estado"
    | "Propiedad"
    | "Horas jugadas"
    | "Minutos jugados";
}

const sortOptions: SortOptions[] = [
  { value: "rating", text: "Rating" },
  { value: "game_name", text: "Nombre" },
  { value: "is_favorite", text: "Favoritos" },
  { value: "status_name", text: "Estado" },
  { value: "ownership_name", text: "Propiedad" },
  { value: "hours_played", text: "Horas jugadas" },
  { value: "minutes_played", text: "Minutos jugados" },
];

export const CollectionSort = () => {
  const { query, clearParams, setParams } = useQueryParams();
  const [inputSort, setInputSort] = useState((query.sort as string) || "");

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputSort(e.target.value);
    clearParams("page");
    setParams("sort", e.target.value);
  };

  useEffect(() => {
    setInputSort((query.sort as string) || "");
  }, [query.sort]);

  return (
    <>
      {query?.q ? (
        <Select className="max-w-lg bg-base-300 lg:select-lg" disabled={true}>
          <Option value="relevance" text="Relevancia" />
        </Select>
      ) : (
        <Select
          className="max-w-lg bg-base-300 lg:select-lg focus:border-2 focus:border-info"
          value={inputSort}
          onChange={handleOnChange}
        >
          <Option value="" text="Criterio" disabled />
          {sortOptions.map((option) => (
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
