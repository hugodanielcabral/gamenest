import { useState } from "react";
import { Option, Select } from "../../../ui/select/Select.tsx";
import { DetailsCard } from "../card/DetailsCard";
import type { Game } from "../../../../types/lists.ts";

interface DetailsContentProps {
  list: Game[];
}

const sortOptions = [
  { value: "game_name", text: "Nombre" },
  { value: "list_games_id", text: "Últimos agregados" },
];

const orderOptions = [
  { value: "asc", text: "Ascendente" },
  { value: "desc", text: "Descendente" },
];

export const DetailsContent = ({ list }: DetailsContentProps) => {
  const [inputSort, setInputSort] = useState({
    sort: "",
    order: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputSort({
      ...inputSort,
      [e.target.name]: e.target.value,
    });
  };

  const sortedList = [...list].sort((a, b) => {
    let comparison = 0;

    if (inputSort.sort === "game_name") {
      comparison = a.game_name.localeCompare(b.game_name);
    } else if (inputSort.sort === "list_games_id") {
      comparison = a.list_games_id - b.list_games_id;
    }

    return inputSort.order === "asc" ? comparison : -comparison;
  });

  return (
    <div className="col-span-full lg:col-span-3 flex flex-col gap-4 md:gap-8">
      <div className="ml-auto flex">
        <Select
          className="max-w-lg bg-base-300 lg:select-lg focus:border-2 focus:border-info"
          value={inputSort.sort}
          onChange={handleOnChange}
          name="sort"
        >
          <Option value="" text="Criterio" disabled />
          {sortOptions.map((option) => (
            <Option key={option.value} value={option.value} text={option.text} />
          ))}
        </Select>

        <Select
          className="max-w-lg bg-base-300 lg:select-lg focus:border-2 focus:border-info"
          value={inputSort.order}
          onChange={handleOnChange}
          name="order"
        >
          <Option value="" text="Orden" disabled />
          {orderOptions.map((option) => (
            <Option key={option.value} value={option.value} text={option.text} />
          ))}
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-4 lg:grid-cols-6">
        {sortedList.map((game) => (
          <DetailsCard key={game.list_games_id} game={game} />
        ))}
      </div>
    </div>
  );
};