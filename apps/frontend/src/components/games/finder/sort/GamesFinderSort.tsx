import { useEffect, useState } from "react";
import { Option, Select } from "../../../ui/select/Select.tsx";
import { useQueryParams } from "../../../../hooks/useQueryParams";

interface SortOptions {
  value: "rating" | "name";
  text: "Rating" | "Nombre";
}

const sortOptions: SortOptions[] = [
  { value: "rating", text: "Rating" },
  { value: "name", text: "Nombre" },
];

export const GamesFinderSort = () => {
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
