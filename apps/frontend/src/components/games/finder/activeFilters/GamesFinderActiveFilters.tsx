import { genresFilterOptions, platformsFilterOptions } from "../../../../data/gamesFinder.ts";
import { useQueryParams } from "../../../../hooks/useQueryParams";
import { Button } from "../../../ui/button/Button.tsx";
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

export const GamesFinderActiveFilters = () => {
  const { searchParams, filterParams } = useQueryParams();

  const getFilterTitle = (category: string, value: string) => {
    const filterConfig = filtersConfig.find((filter) => filter.paramName === category);
    const filterOption = filterConfig?.options.find((option) => option.value === value);

    return filterOption ? filterOption.title : null;
  };

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2">
      {filtersConfig.map(({ paramName }) => {
        const activeFilters = searchParams.get(paramName)?.split(",") || [];

        return (
          <div key={paramName} className="flex flex-wrap gap-2">
            {activeFilters.map((value) => {
              const filterTitle = getFilterTitle(paramName, value);
              return (
                <Button
                  key={value}
                  variant={filterTitle ? "success" : "error"}
                  size="sm"
                  className="text-gray-200 text-xs sm:text-sm md:text-base lg:text-lg btn-outline"
                  onClick={() => filterParams(paramName, value)}
                >
                  {filterTitle ?? "NULL"}
                  <Icon name="icon-[material-symbols--close]" className="size-4" />
                </Button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
