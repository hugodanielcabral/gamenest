import { useQueryParams } from "../../../../hooks/useQueryParams";
import { Button } from "../../../ui/button/Button.tsx";
import { Icon } from "../../../ui/icon/Icon.tsx";

export const GamesFinderActiveFilters = () => {
  const { getParams, clearParams } = useQueryParams();

  const currentFilters = getParams().filter((param) => param.key !== "q");

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2">
      {currentFilters.length > 0 && (
        <p className="text-sm font-bold text-white md:text-lg">
          Filtros activos ({currentFilters.length}) :
        </p>
      )}
      <div className="gap-2 flex flex-wrap">
        {currentFilters?.map((filter) => (
          <Button
            key={filter.key}
            variant="error"
            size="sm"
            onClick={() => clearParams(filter.key)}
          >
            {filter.value}
            <Icon name="icon-[material-symbols--close] size-4" />
          </Button>
        ))}
      </div>
    </div>
  );
};
