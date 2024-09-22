import { useQueryParams } from "../../../hooks/useQueryParams";
import { Collapse } from "../../ui/collapse/Collapse";
import { Label } from "../../ui/label/Label.tsx";
import { Checkbox } from "../../ui/checkbox/Checkbox.tsx";
import { useDataFetch } from "../../../hooks/useDataFetch";
import { Button } from "../../ui/button/Button.tsx";
import { Drawer } from "../../ui/drawer/Drawer.tsx";
import { Icon } from "../../ui/icon/Icon.tsx";
import { useState } from "react";

interface DataFetch {
  fetchData: {
    id: number;
    collection_id: number;
    game_id: string;
    game_name: string;
    game_slug: string;
    game_cover: string;
    hours_played: number;
    minutes_played: number;
    rating: number;
    ownership_name: string;
    status_name: string;
    platform_name: string;
    store_name: string;
    is_favorite: boolean;
    difficulty: string;
    cover: {
      id: number;
      url: string;
    };
    start_date: string;
    finish_date: string;
    amount_paid: string;
    user_id: string;
  }[];
  isLoading: boolean;
}

const status = [
  "Sin estado",
  "Jugando",
  "Completado",
  "Pendiente",
  "Abandonado",
];

const ownership = [
  "Comprado",
  "Compartido",
  "Suscripción",
  "Alquilado",
  "Sin licencia",
  "Otro",
];

const PlatformFilters = ({ uniquePlatforms }) => {
  const { setParams, searchParams, clearParams } = useQueryParams();

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

  const platforms = searchParams.get("platforms")?.split(",") || [];

  return (
    <Collapse
      title="Plataformas"
      detailsClassName="overflow-auto bg-base-200 rounded-lg"
      summaryClassName="bg-base-100 p-2"
    >
      {uniquePlatforms &&
        uniquePlatforms.length > 0 &&
        uniquePlatforms.map((platform) => (
          <Label title={platform} key={platform}>
            <Checkbox
              name={platform}
              value={platform}
              onChange={handleOnChange}
              checked={platforms.includes(platform)}
            />
          </Label>
        ))}
    </Collapse>
  );
};

const StatusFilters = () => {
  const { setParams, searchParams, clearParams } = useQueryParams();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (checked) {
      setParams("status", [...statusFilters, value].join(","));
    } else {
      const filteredStatus = statusFilters.filter((status) => status !== value);

      if (filteredStatus.length === 0) {
        clearParams("status");
        return;
      }

      setParams("status", filteredStatus.join(","));
    }
  };

  const statusFilters = searchParams.get("status")?.split(",") || [];

  return (
    <Collapse
      title="Estado"
      detailsClassName="overflow-auto bg-base-200 rounded-lg"
      summaryClassName="bg-base-100 p-2"
    >
      {status.map((status) => (
        <Label title={status} key={status}>
          <Checkbox
            name={status}
            value={status}
            onChange={handleOnChange}
            checked={statusFilters.includes(status)}
          />
        </Label>
      ))}
    </Collapse>
  );
};

const OwnershipFilters = () => {
  const { setParams, searchParams, clearParams } = useQueryParams();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (checked) {
      setParams("ownership", [...ownershipFilters, value].join(","));
    } else {
      const filteredOwnership = ownershipFilters.filter(
        (ownership) => ownership !== value,
      );

      if (filteredOwnership.length === 0) {
        clearParams("ownership");
        return;
      }

      setParams("ownership", filteredOwnership.join(","));
    }
  };

  const ownershipFilters = searchParams.get("ownership")?.split(",") || [];

  return (
    <Collapse
      title="Propiedad"
      detailsClassName="overflow-auto bg-base-200 rounded-lg"
      summaryClassName="bg-base-100 p-2"
    >
      {ownership.map((ownership) => (
        <Label title={ownership} key={ownership}>
          <Checkbox
            name={ownership}
            value={ownership}
            onChange={handleOnChange}
            checked={ownershipFilters.includes(ownership)}
          />
        </Label>
      ))}
    </Collapse>
  );
};

const FavoritesFilters = () => {
  const { setParams, searchParams, clearParams } = useQueryParams();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;

    if (checked) {
      setParams("favorites", "true");
    } else {
      clearParams("favorites");
    }
  };

  const favorites = searchParams.get("favorites") === "true";

  return (
    <Collapse
      title="Favoritos"
      detailsClassName="overflow-auto bg-base-200 rounded-lg"
      summaryClassName="bg-base-100 p-2"
    >
      <Label title="Favoritos">
        <Checkbox
          name="favorites"
          value="favorites"
          onChange={handleOnChange}
          checked={favorites}
        />
      </Label>
    </Collapse>
  );
};

export const CollectionFilters = () => {
  const { fetchData: collections } = useDataFetch("collection") as DataFetch;
  const [isDrawlerOpen, setIsDrawlerOpen] = useState(false);

  const platformsApi = collections?.map(
    (collection) => collection?.platform_name,
  );
  const uniquePlatforms = [...new Set(platformsApi)];

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
        <StatusFilters />
        <OwnershipFilters />
        <FavoritesFilters />
        <PlatformFilters uniquePlatforms={uniquePlatforms} />
      </Drawer>
      <div className="sticky top-20 hidden h-fit rounded-lg border border-gray-700 lg:block">
        <StatusFilters />
        <OwnershipFilters />
        <FavoritesFilters />
        <PlatformFilters uniquePlatforms={uniquePlatforms} />
      </div>
    </div>
  );
};
