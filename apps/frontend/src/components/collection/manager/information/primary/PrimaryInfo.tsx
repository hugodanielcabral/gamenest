import { ChangeEvent } from "react";
import {
  collectionFormatOptions,
  collectionOwnershipOptions,
  collectionStatusOptions,
} from "../../../../../data/collectionManager";
import { OptionGroup } from "../option/OptionGroup";
import { PlatformGroup } from "../platform/PlatformGroup";

interface PrimaryInfoProps {
  formData: {
    ownership_name: string;
    platform_name: string;
    format_name: string;
    status_name: string;
  };
  game: {
    platforms: {
      id: number;
      abbreviation: string;
      name: string;
    }[];
  };
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const PrimaryInfo = ({ formData, game, handleOnChange }: PrimaryInfoProps) => {
  return (
    <>
      <div className="primary-info grid grid-cols-1 gap-4 rounded-xl border border-gray-700 bg-base-100 p-4 md:grid-cols-2">
        <OptionGroup
          title="Propiedad"
          options={collectionOwnershipOptions}
          name="ownership_name"
          selectedValue={formData.ownership_name}
          handleOnChange={handleOnChange}
          icon="icon-[mdi--property-tag]"
        />
        <PlatformGroup
          platforms={game.platforms}
          selectedPlatform={formData.platform_name}
          handleOnChange={handleOnChange}
        />
      </div>
      <div className="secondary-info grid grid-cols-1 gap-4 rounded-xl border border-gray-700 bg-base-100 p-4 md:grid-cols-2">
        <OptionGroup
          title="Formato"
          options={collectionFormatOptions}
          name="format_name"
          selectedValue={formData.format_name}
          handleOnChange={handleOnChange}
          icon="icon-[clarity--cd-dvd-solid]"
        />
        <OptionGroup
          title="Estado"
          options={collectionStatusOptions}
          name="status_name"
          selectedValue={formData.status_name}
          handleOnChange={handleOnChange}
          icon="icon-[f7--status]"
        />
      </div>
    </>
  );
};
