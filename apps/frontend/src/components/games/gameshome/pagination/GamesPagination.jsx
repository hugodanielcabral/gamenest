import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
export const GamesPagination = ({ page, handlePageChange, totalPages }) => {
  // eslint-disable-next-line react/prop-types
  const { count } = totalPages;
  console.log(count);
  const totalPageCount = Math.ceil(count / 10);

  return (
    <div className="grid grid-cols-2 mx-auto join max-w-60">
      <button
        disabled={page <= 0}
        onClick={() => handlePageChange("games", page - 1)}
        className="text-sm join-item btn btn-outline bg-base-300 disabled:bg-base-200 disabled:cursor-not-allowed"
      >
        Previous page
      </button>
      <button
        disabled={page >= totalPageCount - 1}
        onClick={() => handlePageChange("games", page + 1)}
        className="text-sm join-item btn btn-outline bg-base-300 disabled:bg-base-200 disabled:cursor-not-allowed"
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
