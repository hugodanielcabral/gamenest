import { useState } from "react";
import { Collapse } from "../../../ui/collapse/Collapse";
import { Label } from "../../../ui/label/Label.tsx";
import { Checkbox } from "../../../ui/checkbox/Checkbox.tsx";
import { useQueryParams } from "../../../../hooks/useQueryParams.ts";
import {
  genresFilterOptions,
  platformsFilterOptions,
} from "../../../../data/gamesFinder.ts";
import { Button } from "../../../ui/button/Button.tsx";
import { Drawer } from "../../../ui/drawer/Drawer.tsx";
import { Icon } from "../../../ui/icon/Icon.tsx";

const filtersConfig = [
  {
    id: "platforms",
    title: "Plataformas",
    options: platformsFilterOptions,
    paramName: "platforms",
  },
  {
    id: "genres",
    title: "Géneros",
    options: genresFilterOptions,
    paramName: "genres",
  },
];

export const GamesFinderFilters = () => {
  const { setParams, searchParams, clearParams } = useQueryParams();
  const [isDrawlerOpen, setIsDrawlerOpen] = useState(false);
  const maxVisibleFilters = 6;

  const [showAllFilters, setShowAllFilters] = useState<{
    [key: string]: boolean;
  }>({});

  const handleFilterChange = (
    category: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value, checked } = e.target;
    const currentFilters = searchParams.get(category)?.split(",") || [];

    if (checked) {
      setParams(category, [...currentFilters, value].join(","));
    } else {
      const updatedFilters = currentFilters.filter((item) => item !== value);
      updatedFilters.length === 0
        ? clearParams(category)
        : setParams(category, updatedFilters.join(","));
    }
  };

  const toggleShowAll = (category: string) => {
    setShowAllFilters((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <div className="col-span-1 mx-auto lg:mx-0">
      <Button
        className="btn-outline text-xs text-white sm:text-sm lg:hidden"
        variant="info"
        size="sm"
        onClick={() => setIsDrawlerOpen(!isDrawlerOpen)}
      >
        <Icon name="icon-[mdi--filter]" className="size-3 sm:size-4" />
        Filtros
      </Button>
      <Drawer
        title="Filtrar por"
        isOpen={isDrawlerOpen}
        setIsOpen={setIsDrawlerOpen}
      >
        {filtersConfig.map(({ id, title, options, paramName }) => {
          const currentFilters = searchParams.get(paramName)?.split(",") || [];
          const filtersToShow = showAllFilters[id]
            ? options
            : options.slice(0, maxVisibleFilters);

          return (
            <Collapse
              key={id}
              title={title}
              detailsClassName="bg-base-300 border rounded-sm border-gray-700"
              summaryClassName="bg-base-100 p-4"
              isOpen={true}
            >
              {filtersToShow.map(({ id, title, value }) => (
                <Label title={title} key={id}>
                  <Checkbox
                    name={title}
                    value={value}
                    onChange={(e) => handleFilterChange(paramName, e)}
                    checked={currentFilters.includes(value)}
                  />
                </Label>
              ))}
              {options.length > maxVisibleFilters && (
                <Button
                  className="btn-outline mt-2 text-xs"
                  variant="error"
                  size="sm"
                  onClick={() => toggleShowAll(id)}
                >
                  {showAllFilters[id] ? "Mostrar menos" : "Mostrar más"}
                </Button>
              )}
            </Collapse>
          );
        })}
      </Drawer>
      <div className="sticky top-20 hidden h-fit rounded-lg border border-gray-700 lg:block">
        {filtersConfig.map(({ id, title, options, paramName }) => {
          const currentFilters = searchParams.get(paramName)?.split(",") || [];
          const filtersToShow = showAllFilters[id]
            ? options
            : options.slice(0, maxVisibleFilters);

          return (
            <Collapse
              key={id}
              title={title}
              detailsClassName="overflow-auto bg-base-200 rounded-lg"
              summaryClassName="bg-base-100 p-2"
            >
              {filtersToShow.map(({ id, title, value }) => (
                <Label title={title} key={id}>
                  <Checkbox
                    name={title}
                    value={value}
                    onChange={(e) => handleFilterChange(paramName, e)}
                    checked={currentFilters.includes(value)}
                  />
                </Label>
              ))}
              {options.length > maxVisibleFilters && (
                <Button
                  className="btn-outline mt-2 text-xs"
                  variant="error"
                  size="sm"
                  onClick={() => toggleShowAll(id)}
                >
                  {showAllFilters[id] ? "Mostrar menos" : "Mostrar más"}
                </Button>
              )}
            </Collapse>
          );
        })}
      </div>
    </div>
  );
};