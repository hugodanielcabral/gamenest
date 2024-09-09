import { Label } from "../../../../ui/label/Label.tsx";
import { Radio } from "../../../../ui/radio/Radio.tsx";

interface PlatformGroupProps {
  platforms: { id: number; name: string; abbreviation: string }[];
  selectedPlatform: string;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PlatformGroup = ({
  platforms,
  selectedPlatform,
  handleOnChange,
}: PlatformGroupProps) => (
  <div className="relative">
    <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-400">Plataforma</h3>
    {platforms.map((platform) => (
      <div key={platform.id} className="form-control">
        <Label title={platform.name}>
          <Radio
            name="platform_name"
            value={platform.abbreviation}
            onChange={handleOnChange}
            checked={selectedPlatform === platform.abbreviation}
          />
        </Label>
      </div>
    ))}
  </div>
);
