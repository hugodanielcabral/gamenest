import clsx from "clsx";
import propTypes from "prop-types";
import { twMerge } from "tailwind-merge";

export const Pagination = ({
  currentPage,
  handlePageChange,
  totalPages,
  className,
}) => {
  return (
    <div className={twMerge(clsx("join ring-red-500", className))}>
      <button
        className="join-item btn disabled:bg-base-300 disabled:text-base-500 disabled:cursor-not-allowed disabled:bg-opacity-50"
        disabled={currentPage <= 1}
        onClick={() => {
          handlePageChange(currentPage - 1);
        }}
      >
        «
      </button>

      <button className="join-item btn">{currentPage}</button>
      <button
        className="join-item btn disabled:bg-base-300 disabled:bg-opacity-50 disabled:text-base-500 disabled:cursor-not-allowed"
        disabled={currentPage >= totalPages}
        onClick={() => {
          handlePageChange(currentPage + 1);
        }}
      >
        »
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: propTypes.number.isRequired,
  handlePageChange: propTypes.func.isRequired,
  totalPages: propTypes.number.isRequired,
  className: propTypes.string,
};

Pagination.defaultProps = {
  className: "",
};
