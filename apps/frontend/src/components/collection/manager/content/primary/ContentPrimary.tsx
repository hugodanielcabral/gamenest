import {
  collectionOwnershipOptions,
  collectionStatusOptions,
} from "../../../../../data/collectionManager.ts";
import { Label } from "../../../../ui/label/Label.tsx";
import { Select, Option } from "../../../../ui/select/Select.tsx";

const formatOptions = [
  {
    id: 1,
    name: "Físico",
  },
  {
    id: 2,
    name: "Digital",
  },
];

interface ContentPrimaryProps {
  game: {
    id: number;
    name: string;
    platforms: {
      id: number;
      abbreviation: string;
      name: string;
    }[];
  };

  formState: {
    platform_name: string;
    format_name: string;
    ownership_name: string;
    status_name: string;
  };

  handleOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const ContentPrimary = ({
  game,
  formState,
  handleOnChange,
}: ContentPrimaryProps) => {
  return (
    <div className="p-4 space-y-2 md:space-y-4">
      <h2 className="text-center text-xl text-gray-300 sm:text-2xl md:text-3xl lg:text-4xl">
        Datos principales
      </h2>
      <section className="flex flex-col md:flex-row  *:flex-grow">
        <Label
          title=""
          className="flex flex-grow flex-col border-0 bg-transparent"
        >
          <Select
            className="flex-grow valid:border-2 valid:border-success focus:border-2 focus:border-info"
            name="platform_name"
            value={formState.platform_name}
            onChange={handleOnChange}
            required
          >
            <Option text="Selecciona una plataforma" value="" disabled />
            {game.platforms.map((platform) => (
              <Option key={platform.id} text={platform.name} />
            ))}
          </Select>
        </Label>
        <Label title="" className="flex flex-col border-0 bg-transparent">
          <Select
            className="valid:border-2 valid:border-success focus:border-2 focus:border-info"
            name="format_name"
            value={formState.format_name}
            onChange={handleOnChange}
            required
          >
            <Option text="Selecciona un formato" value="" disabled />
            {formatOptions.map((format) => (
              <Option key={format.id} text={format.name} />
            ))}
          </Select>
        </Label>
      </section>
      <section className="flex flex-col md:flex-row *:flex-grow">
        <Label title="" className="flex flex-col border-0 bg-transparent">
          <Select
            className="valid:border-2 valid:border-success focus:border-2 focus:border-info"
            name="ownership_name"
            value={formState.ownership_name}
            onChange={handleOnChange}
            required
          >
            <Option text="Selecciona el tipo de propiedad" value="" disabled />
            {collectionOwnershipOptions.map((ownership) => (
              <Option key={ownership.id} text={ownership.title} />
            ))}
          </Select>
        </Label>
        <Label title="" className="flex flex-col border-0 bg-transparent">
          <Select
            className="valid:border-2 valid:border-success focus:border-2 focus:border-info"
            name="status_name"
            value={formState.status_name}
            onChange={handleOnChange}
            required
          >
            <Option text="Selecciona el estado de juego" value="" disabled />
            {collectionStatusOptions.map((status) => (
              <Option key={status.id} text={status.title} />
            ))}
          </Select>
        </Label>
      </section>
    </div>
  );
};
