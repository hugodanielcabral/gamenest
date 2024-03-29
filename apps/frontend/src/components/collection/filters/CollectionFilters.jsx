import propTypes from "prop-types";
import { useSearchParams } from "react-router-dom";

export const CollectionFilters = ({ handleStatus, setStatusQuery }) => {
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

  if (getStatus) {
    getStatus.split(", ").forEach((status) => {
      const input = document.querySelector(`input[value="${status}"]`);
      if (input) input.checked = true;
      setStatusQuery(getStatus);
    });
  }

  return (
    <aside className="hidden md:col-span-1 md:block">
      <div className="bg-base-100/90 bg-opacity-90 shadow-sm shadow-black h-96 p-5">
        <h2 className="text-center text-xl font-bold text-buttons-400">
          Filters
        </h2>
        <div>
          <h3 className="font-semibold">Status</h3>
          {statusValues.map((status) => (
            <div key={status.id} className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">{status.name}</span>
                <input
                  type="checkbox"
                  className="checkbox"
                  value={status.name}
                  checked={getStatus?.includes(status.name)}
                  onChange={handleStatus}
                />
              </label>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

CollectionFilters.propTypes = {
  handleStatus: propTypes.func.isRequired,
  setStatusQuery: propTypes.func.isRequired,
};
