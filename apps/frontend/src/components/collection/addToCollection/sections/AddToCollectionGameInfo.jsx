import propTypes from "prop-types";
import { ownershipValues } from "../../../../data/ownershipStatusValues.jsx";
import clsx from "clsx";
import { CardBackground } from "../../../ui/cardBackground/CardBackground.jsx";

export const AddToCollectionGameInfo = ({
  data,
  formData,
  handleOnChange,
  errors,
}) => {
  return (
    <CardBackground className="col-span-2">
      <h3 className="text-xl underline underline-offset-8 decoration-error font-semibold text-white">
        GAME INFORMATION
      </h3>
      <div className="flex flex-col md:flex-row justify-around my-2">
        <div className="mt-2">
          <h4 className="text-lg">Platform</h4>
          <select
            className={clsx(
              {
                "border-1 border-error":
                  errors && errors.some((err) => err.path == "platform"),
                "border-1 border-success": formData.platform !== "",
              },
              "select select-bordered w-full max-w-xs mt-5"
            )}
            onChange={handleOnChange}
            value={
              formData.platform === ""
                ? "Choose your platform"
                : formData.platform
            }
            name="platform"
            id="platform"
          >
            <option disabled selected>
              Choose your platform
            </option>
            {data.platforms.map((platform) => (
              <option key={platform.id} value={platform.name}>
                {platform.name}
              </option>
            ))}
          </select>
          {errors && errors.some((err) => err.path == "platform") ? (
            <p className="text-error text-xs mt-1">
              {formData.platform !== ""
                ? null
                : errors.find((err) => err.path == "platform").msg}
            </p>
          ) : null}
        </div>
        <div className="mt-2">
          <h4 className="text-lg">Ownership</h4>
          <div className="flex flex-wrap max-w-80 gap-3">
            {ownershipValues.map((ownership) => (
              <div
                key={ownership.id}
                className={clsx(
                  "form-control size-24 h-fit bg-base-200",
                  formData.ownership === ownership.name
                    ? "border-info border-2"
                    : "border-info border border-opacity-25"
                )}
              >
                <label className="label cursor-pointer">
                  <span className="label-text flex-col flex gap-2 items-center justify-center w-full text-white font-bold">
                    {ownership.icon}
                    {ownership.name}
                  </span>
                  <input
                    type="radio"
                    name="ownership"
                    className="radio radio-mark"
                    value={ownership.name}
                    onChange={handleOnChange}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CardBackground>
  );
};

AddToCollectionGameInfo.propTypes = {
  data: propTypes.array.isRequired,
  formData: propTypes.object.isRequired,
  handleOnChange: propTypes.func.isRequired,
  errors: propTypes.array,
};
