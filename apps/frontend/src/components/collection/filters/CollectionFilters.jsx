import propTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import { CardBackground } from "../../ui/cardBackground/CardBackground";
import { Checkbox } from "../../ui/checkbox/Checkbox";
import clsx from "clsx";

export const CollectionFilters = ({
  handleStatus,
  setStatusQuery,
  handleOnClearFilters,
}) => {
  const [searchParams] = useSearchParams();

  const statusValues = [
    {
      id: 1,
      name: "Playing",
    },
    {
      id: 2,
      name: "Completed",
    },
    {
      id: 3,
      name: "Dropped",
    },
    {
      id: 4,
      name: "Plan to play",
    },
  ];

  const getStatus = searchParams.get("status");
  console.log(getStatus);

  if (getStatus) {
    getStatus.split(", ").forEach((status) => {
      const input = document.querySelector(`input[value="${status}"]`);
      if (input) input.checked = true;
      setStatusQuery(getStatus);
    });
  }

  return (
    <CardBackground>
      <button
        className={clsx(
          {
            hidden: !getStatus,

            block: getStatus,
          },
          "btn btn-error btn-outline btn-sm mt-2 self-auto w-full my-5"
        )}
        onClick={handleOnClearFilters}
      >
        Clear filters
      </button>
      <h2 className="text-xl font-semibold">Status</h2>
      {statusValues.map((status) => (
        <div key={status.id} className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">{status.name}</span>
            <Checkbox
              value={status.name}
              checked={getStatus?.includes(status.name)}
              onChange={handleStatus}
            />
          </label>
        </div>
      ))}
    </CardBackground>
  );
};

CollectionFilters.propTypes = {
  handleStatus: propTypes.func.isRequired,
  setStatusQuery: propTypes.func.isRequired,
  handleOnClearFilters: propTypes.func.isRequired,
};
