import { useQueryParams } from "../../../hooks/useQueryParams";
import { Button } from "../../ui/button/Button";
import { Icon } from "../../ui/icon/Icon";

export const CollectionActiveFilters = () => {
  const { searchParams, filterParams } = useQueryParams();

  const platforms = searchParams.get("platforms")?.split(",") || [];

  const status = searchParams.get("status")?.split(",") || [];

  const ownership = searchParams.get("ownership")?.split(",") || [];

  const favorites = searchParams.get("favorites");

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2">
      <div className="flex flex-wrap gap-2">
        {platforms.length > 0 &&
          platforms.map((platform) => {
            return (
              <Button
                key={platform}
                size="sm"
                variant={platform ? "success" : "error"}
                className="text-xs text-gray-200 sm:text-sm md:text-base lg:text-lg"
                onClick={() => filterParams("platforms", platform)}
              >
                <Icon name="icon-[material-symbols--close] size-4" />
                {platform ?? "NULL"}
              </Button>
            );
          })}

        {status.length > 0 &&
          status.map((status) => {
            return (
              <Button
                key={status}
                size="sm"
                variant={status ? "success" : "error"}
                className="text-xs text-gray-200 sm:text-sm md:text-base lg:text-lg"
                onClick={() => filterParams("status", status)}
              >
                <Icon name="icon-[material-symbols--close] size-4" />
                {status ?? "NULL"}
              </Button>
            );
          })}

        {ownership.length > 0 &&
          ownership.map((ownership) => {
            return (
              <Button
                key={ownership}
                size="sm"
                variant={ownership ? "success" : "error"}
                className="text-xs text-gray-200 sm:text-sm md:text-base lg:text-lg"
                onClick={() => filterParams("ownership", ownership)}
              >
                <Icon name="icon-[material-symbols--close] size-4" />
                {ownership ?? "NULL"}
              </Button>
            );
          })}

        {favorites && (
          <Button
            size="sm"
            variant="success"
            className="text-xs text-gray-200 sm:text-sm md:text-base lg:text-lg"
            onClick={() => filterParams("favorites", "true")}
          >
            <Icon name="icon-[material-symbols--close] size-4" />
            Solo favoritos
          </Button>
        )}
      </div>
    </div>
  );
};
