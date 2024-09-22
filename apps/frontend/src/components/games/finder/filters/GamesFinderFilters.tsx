import { useState } from "react";
import { Collapse } from "../../../ui/collapse/Collapse";
import { Label } from "../../../ui/label/Label.tsx";
import { Checkbox } from "../../../ui/checkbox/Checkbox.tsx";
import { useQueryParams } from "../../../../hooks/useQueryParams.ts";
import { platformsFilterOptions } from "../../../../data/gamesFinder.ts";
import { Button } from "../../../ui/button/Button.tsx";
import { Drawer } from "../../../ui/drawer/Drawer.tsx";
import { Icon } from "../../../ui/icon/Icon.tsx";

export const GamesFinderFilters = () => {
  const { setParams, searchParams, clearParams } = useQueryParams();
  const [showAllPlatforms, setShowAllPlatforms] = useState(false);
  const [isDrawlerOpen, setIsDrawlerOpen] = useState(false);
  const initialPlatformsToShow = 10;

  const platforms = searchParams.get("platforms")?.split(",") || [];

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (checked) {
      setParams("platforms", [...platforms, value].join(","));
    } else {
      const filteredPlatforms = platforms.filter(
        (platform) => platform !== value,
      );

      if (filteredPlatforms.length === 0) {
        clearParams("platforms");
        return;
      }

      setParams("platforms", filteredPlatforms.join(","));
    }
  };

  const handleToggleShowPlatforms = () => {
    setShowAllPlatforms((prev) => !prev);
  };

  const platformsToShow = showAllPlatforms
    ? platformsFilterOptions
    : platformsFilterOptions.slice(0, initialPlatformsToShow);

  return (
    <div className="col-span-1 mx-auto lg:mx-0">
      <Button
        className="text-xs text-white sm:text-sm lg:hidden"
        variant="info"
        size="sm"
        onClick={() => setIsDrawlerOpen(!isDrawlerOpen)}
      >
        <Icon
          name="icon-[mdi--filter]"
          className="size-3 text-gray-200 sm:size-4"
        />
        Filtros
      </Button>
      <Drawer
        title="Filtrar por"
        isOpen={isDrawlerOpen}
        setIsOpen={setIsDrawlerOpen}
      >
        <Collapse
          title="Plataformas"
          detailsClassName="bg-base-300 border rounded-sm border-gray-700"
          summaryClassName="bg-base-100 p-4"
          isOpen={true}
        >
          {platformsToShow.map((platform) => (
            <Label title={platform.title} key={platform.id}>
              <Checkbox
                name={platform.title}
                value={platform.value}
                onChange={handleOnChange}
                checked={platforms.includes(platform.value)}
              />
            </Label>
          ))}
          {platformsFilterOptions.length > initialPlatformsToShow && (
            <Button
              className="mt-2 text-xs"
              variant="error"
              size="sm"
              onClick={handleToggleShowPlatforms}
            >
              {showAllPlatforms ? "Mostrar menos" : "Mostrar más"}
            </Button>
          )}
        </Collapse>
      </Drawer>
      <div className="sticky top-20 hidden h-fit rounded-lg border border-gray-700 lg:block">
        <Collapse
          title="Plataformas"
          detailsClassName="overflow-auto bg-base-200 rounded-lg"
          summaryClassName="bg-base-100 p-2"
        >
          {platformsToShow.map((platform) => (
            <Label title={platform.title} key={platform.id}>
              <Checkbox
                name={platform.title}
                value={platform.value}
                onChange={handleOnChange}
                checked={platforms.includes(platform.value)}
              />
            </Label>
          ))}
          {platformsFilterOptions.length > initialPlatformsToShow && (
            <Button
              className="mt-2 text-xs"
              variant="error"
              size="sm"
              onClick={handleToggleShowPlatforms}
            >
              {showAllPlatforms ? <>
                Mostrar menos
                <Icon name="icon-[mdi--chevron-up]" className="size-4" />
              </> : <>
                Mostrar más
                <Icon name="icon-[mdi--chevron-down]" className="size-4" />
              </>}
            </Button>
          )}
        </Collapse>
      </div>
    </div>
  );
};
