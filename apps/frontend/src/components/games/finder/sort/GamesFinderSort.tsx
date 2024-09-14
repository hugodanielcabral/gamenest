import queryString from "query-string";
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Option, Select } from "../../../ui/select/Select.tsx";

const sortOptions = [
  { value: "name", text: "Nombre" },
  { value: "rating", text: "Rating" },
];

export const GamesFinderSort = () => {
  const { search } = useLocation();
  const { sort = "", q = "" } = queryString.parse(search);
  const [inputSort, setInputSort] = useState(sort as string);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputSort(e.target.value);

    const searchQuery = new URLSearchParams(searchParams);
    searchQuery.delete("page");
    searchQuery.set("sort", e.target.value);
    navigate(`?${searchQuery.toString()}`);
  };
  return (
    <>
      {q ? (
        <Select className="max-w-lg bg-base-300 lg:select-lg" disabled={true}>
          <Option value="relevance" text="Relevancia" />
        </Select>
      ) : (
        <Select
          className="max-w-lg bg-base-300 lg:select-lg focus:border-info focus:border-2"
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
