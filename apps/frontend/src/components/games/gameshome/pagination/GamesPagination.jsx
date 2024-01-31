import PropTypes from "prop-types";

export const GamesPagination = ({ page, handlePageChange }) => {
  return (
    <div className="grid grid-cols-2 mx-auto join max-w-60">
      <button
        disabled={page === 0}
        onClick={() => handlePageChange(page - 1)}
        className="join-item btn btn-outline bg-white-color text-black-color disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:border-none disabled:text-black-color disabled:bg-white-color"
      >
        Previous page
      </button>
      <button
        onClick={() => handlePageChange(page + 1)}
        className="join-item btn btn-outline bg-white-color text-black-color"
      >
        Next page
      </button>
    </div>
  );
};

GamesPagination.propTypes = {
  page: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};
