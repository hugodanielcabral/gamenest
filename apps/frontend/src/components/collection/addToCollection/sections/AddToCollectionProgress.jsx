import { statusValues } from "../../../../data/ownershipStatusValues";
import propTypes from "prop-types";
import clsx from "clsx";

export const AddToCollectionProgress = ({
  formData,
  handleOnChange,
  errors,
}) => {
  return (
    <section className="col-span-2 md:col-span-2 bg-base-100/90 bg-opacity-90 shadow-sm shadow-black p-3">
      <h3 className="text-xl underline underline-offset-8 decoration-buttons-500">
        PROGRESS
      </h3>
      <div className="flex flex-col md:flex-row justify-around my-2">
        <div className="mt-2">
          <h4 className="text-lg">Status</h4>
          <div className="flex flex-wrap max-w-80 gap-3">
            {statusValues.map((status) => (
              <div
                key={status.id}
                className={clsx(
                  "form-control size-24 h-fit bg-base-200",
                  formData.status === status.name
                    ? "border-details-500 border-2"
                    : "border-details-300 border border-opacity-25"
                )}
              >
                <label className="label cursor-pointer">
                  <span className="label-text flex-col flex gap-2 items-center justify-center w-full text-buttons-500 dark:text-buttons-300 font-bold">
                    {status.icon}
                    {status.name}
                  </span>
                  <input
                    type="radio"
                    name="status"
                    className="radio radio-mark"
                    value={status.name}
                    onChange={handleOnChange}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-2">
          <h4 className="text-lg">Progress Notes</h4>
          <textarea
            className={clsx(
              "textarea textarea-lg	textarea-bordered w-full max-w-xs mt-5",
              {
                "border-danger-500":
                  errors && errors.some((err) => err.path == "progress_note"),
                "border-1":
                  errors && !errors.some((err) => err.path == "progress_note"),
              }
            )}
            placeholder="Notes"
            name="progressNotes"
            id="progressNotes"
            onChange={handleOnChange}
          ></textarea>
        </div>
      </div>
    </section>
  );
};

AddToCollectionProgress.propTypes = {
  data: propTypes.array.isRequired,
  formData: propTypes.object.isRequired,
  handleOnChange: propTypes.func.isRequired,
  errors: propTypes.array,
};
