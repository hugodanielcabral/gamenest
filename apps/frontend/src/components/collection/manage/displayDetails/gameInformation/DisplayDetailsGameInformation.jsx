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
    <section className="grid grid-cols-6 space-y-8">
      <h2 className="col-span-6 mb-2 text-center text-lg font-semibold uppercase text-red-500 sm:text-xl md:text-left md:text-2xl lg:text-3xl">
        Información
      </h2>

      <OptionRadioGroup
        title="Propiedad"
        options={GAME_OWNERSHIP}
        selectedOption={ownership}
        handleOnChange={handleOnChange}
        name="ownership"
      />

      <OptionRadioGroup
        title="Tienda"
        options={GAME_STORES}
        selectedOption={store}
        handleOnChange={handleOnChange}
        name="store"
      />
      <div className="col-span-6 space-y-5 sm:col-span-5 md:col-span-2">
        <OptionRadioGroup
          title="Formato"
          options={GAME_FORMATS}
          selectedOption={format}
          handleOnChange={handleOnChange}
          name="format"
        />
        <OptionSelectGroup
          title="Plataforma"
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
