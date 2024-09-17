import { platformsFilterOptions } from "../../../../data/gamesFinder.ts";
import { useQueryParams } from "../../../../hooks/useQueryParams";
import { Button } from "../../../ui/button/Button.tsx";
import { Icon } from "../../../ui/icon/Icon.tsx";

export const GamesFinderActiveFilters = () => {
  const { searchParams, filterParams } = useQueryParams();

  const platforms = searchParams.get("platforms")?.split(",") || [];

  const getPlatformTitle = (platformValue: string) => {
    const platformTitle = platformsFilterOptions.find(
      (option) => option.value === platformValue,
    );

    return platformTitle ? platformTitle.title : null;
  };

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2">
      <div className="flex flex-wrap gap-2">
        {platforms.length > 0 &&
          platforms.map((platform) => {
            const platformTitle = getPlatformTitle(platform);
            return (
              <Button
                key={platform}
                variant={platformTitle ? "success" : "error"}
                size="sm"
                className="text-gray-200 text-xs sm:text-sm md:text-base lg:text-lg"
                onClick={() => filterParams("platforms", platform)}
              >
                {platformTitle ?? "NULL"}
                <Icon name="icon-[material-symbols--close] size-4" />
              </Button>
            );
          })}
      </div>
    </div>
  );
};
