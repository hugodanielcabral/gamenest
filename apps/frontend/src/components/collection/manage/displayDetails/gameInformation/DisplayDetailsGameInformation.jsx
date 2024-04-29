import propTypes from "prop-types";
import {
  GAME_FORMATS,
  GAME_OWNERSHIP,
  GAME_STORES,
} from "../../../../../utils/constants";
import { OptionRadioGroup } from "../articles/OptionRadioGroup";
import { OptionSelectGroup } from "../articles/OptionSelectGroup";

export const DisplayDetailsGameInformation = ({
  data,
  platform,
  format,
  ownership,
  store,
  handleOnChange,
}) => {
  return (
    <section className="grid grid-cols-6 *:mt-2 ">
      <h2 className="mb-2 uppercase col-span-6 text-lg md:text-2xl lg:text-3xl font-semibold text-white md:text-left text-center">
        Game information
      </h2>

      <OptionRadioGroup
        title="Ownership"
        options={GAME_OWNERSHIP}
        selectedOption={ownership}
        handleOnChange={handleOnChange}
        name="ownership"
      />

      <OptionRadioGroup
        title="Stores"
        options={GAME_STORES}
        selectedOption={store}
        handleOnChange={handleOnChange}
        name="store"
      />
      <div className="col-span-6 md:col-span-2 space-y-2">
        <OptionRadioGroup
          title="Format"
          options={GAME_FORMATS}
          selectedOption={format}
          handleOnChange={handleOnChange}
          name="format"
        />
        <OptionSelectGroup
          title="Platform"
          name="platform"
          handleOnChange={handleOnChange}
          value={platform}
          options={data.platforms}
        />
      </div>
    </section>
  );
};

DisplayDetailsGameInformation.propTypes = {
  data: propTypes.object.isRequired,
  platform: propTypes.string.isRequired,
  format: propTypes.string.isRequired,
  ownership: propTypes.string.isRequired,
  store: propTypes.string.isRequired,
  handleOnChange: propTypes.func.isRequired,
};

DisplayDetailsGameInformation.defaultProps = {
  data: {},
  platform: "",
  format: "",
  ownership: "",
  store: "",
};
