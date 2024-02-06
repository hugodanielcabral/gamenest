import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
export const GamesPagination = ({ page, handlePageChange, totalPages }) => {
  // eslint-disable-next-line react/prop-types
  const { count } = totalPages;
  const totalPageCount = Math.ceil(count / 10); // Assuming 10 items per page

  return (
    <div className="grid grid-cols-2 mx-auto join max-w-60">
      <button
        disabled={page === 0}
        onClick={() => handlePageChange(page - 1)}
        className="text-sm join-item btn btn-outline bg-base"
      >
        Previous page
      </button>
      <button
        disabled={page >= totalPageCount - 1} // Disable if current page is the last page
        onClick={() => handlePageChange(page + 1)}
        className="text-sm join-item btn btn-outline bg-base"
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
