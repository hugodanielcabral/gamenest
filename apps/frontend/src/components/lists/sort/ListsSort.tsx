import { useEffect, useState } from "react";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { Option, Select } from "../../ui/select/Select.tsx";

interface SortOptions {
    value: "created_on" | "updated_on" | "likes" | "title";
    text: "Últimos añadidos" | "Últimos actualizados" | "Más gustados" | "Título";
  }
  
  const sortOptions: SortOptions[] = [
    { value: "created_on", text: "Últimos añadidos" },
    { value: "updated_on", text: "Últimos actualizados" },
    { value: "likes", text: "Más gustados" },
    { value: "title", text: "Título" },
  ];
export const ListsSort = () => {

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
  </>  )
}
