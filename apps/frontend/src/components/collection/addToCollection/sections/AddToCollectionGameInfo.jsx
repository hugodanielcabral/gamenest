import propTypes from "prop-types";
import { ownershipValues } from "../../../../data/ownershipStatusValues.jsx";
import clsx from "clsx";

export const AddToCollectionGameInfo = ({
  data,
  formData,
  handleOnChange,
  errors,
}) => {
  console.log(errors);
  return (
    <section className="col-span-2 bg-base-100/90 bg-opacity-90 shadow-sm shadow-black p-3">
      <h3 className="text-xl underline underline-offset-8 decoration-buttons-500">
        GAME INFORMATION
      </h3>
      <div className="flex flex-col md:flex-row justify-around my-2">
        <div className="mt-2">
          <h4 className="text-lg">Platform</h4>
          <select
            className={clsx(
              {
                "border-1 border-danger-500":
                  errors && errors.some((err) => err.path == "platform"),
                "border-1 border-success": formData.platform !== "",
              },
              "select select-bordered w-full max-w-xs mt-5"
            )}
            onChange={handleOnChange}
            name="platform"
            id="platform"
          >
            <option disabled defaultValue="" selected>
              Choose your platform
            </option>
            {data[0].platforms.map((platform) => (
              <option key={platform.id} value={platform.name}>
                {platform.name}
              </option>
            ))}
          </select>
          {errors && errors.some((err) => err.path == "platform") ? (
            <p className="text-danger-500 text-xs mt-1">
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
                    ? "border-details-500 border-2"
                    : "border-details-300 border border-opacity-25"
                )}
              >
                <label className="label cursor-pointer">
                  <span className="label-text flex-col flex gap-2 items-center justify-center w-full text-buttons-500 dark:text-buttons-300 font-bold">
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
    </section>
  );
};

AddToCollectionGameInfo.propTypes = {
  data: propTypes.array.isRequired,
  formData: propTypes.object.isRequired,
  handleOnChange: propTypes.func.isRequired,
  errors: propTypes.array,
};
