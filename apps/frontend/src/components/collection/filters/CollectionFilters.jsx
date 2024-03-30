import propTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const CollectionFilters = ({ handleStatus, setStatusQuery }) => {
  const [searchParams] = useSearchParams();
  const [isVisible, setIsVisible] = useState(false);

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

  useEffect(() => {
    const checkScroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      const scrolledTo = scrollTop / scrollHeight;

      if (scrolledTo > 0.1 && scrolledTo < 0.7) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", checkScroll);

    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  return (
    <aside className="md:col-span-1">
      <div className="hidden md:block bg-base-100/90 bg-opacity-90 shadow-sm shadow-black h-96 p-5">
        <h2 className="text-center text-2xl font-bold">Filters</h2>
        <div>
          <div className="divider divider-primary">
            <h3 className="font-semibold">Status</h3>
          </div>
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

      {!isVisible && (
        <div className="drawer z-10">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label
              htmlFor="my-drawer"
              className="btn btn-info drawer-button 
              fixed inset-x-1/4 top-[600px] md:hidden text-white font-bold text-lg"
            >
              Filters
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              <h2 className="text-center text-2xl font-bold">Filters</h2>

              <div className="divider divider-primary">
                <h3 className="font-semibold">Status</h3>
              </div>
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
            </ul>
          </div>
        </div>
      )}
    </aside>
  );
};

CollectionFilters.propTypes = {
  handleStatus: propTypes.func.isRequired,
  setStatusQuery: propTypes.func.isRequired,
};
