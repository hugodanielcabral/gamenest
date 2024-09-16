import { useState } from "react";
import { Collapse } from "../../../ui/collapse/Collapse";
import { Label } from "../../../ui/label/Label.tsx";
import { Checkbox } from "../../../ui/checkbox/Checkbox.tsx";
import { useQueryParams } from "../../../../hooks/useQueryParams.ts";
import { platformsFilterOptions } from "../../../../data/gamesFinder.ts";
import { Button } from "../../../ui/button/Button.tsx";

export const GamesFinderFilters = () => {
  const { setParams, searchParams, clearParams } = useQueryParams();
  const [showAllPlatforms, setShowAllPlatforms] = useState(false);
  const initialPlatformsToShow = 4;

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
    <div /* className="fixed inset-0 z-50 flex flex-col overflow-auto bg-base-200" */
    >
      <div className="flex-grow p-4">
        <Collapse title="Platforms" detailsClassName="bg-base-200">
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
      </div>
    </div>
  );
};
