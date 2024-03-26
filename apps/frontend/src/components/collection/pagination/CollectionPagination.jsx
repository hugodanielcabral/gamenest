import propTypes from "prop-types";

export const CollectionPagination = ({
  handlePage,
  currentPage,
  totalPage,
}) => {
  return (
    <div className="join col-span-6 mx-auto min-h-96 items-end">
      <button
        className="join-item btn"
        disabled={currentPage <= 1}
        onClick={() => handlePage(currentPage - 1)}
      >
        «
      </button>
      <button className="join-item btn">Page {currentPage}</button>
      <button
        className="join-item btn"
        onClick={() => handlePage(currentPage + 1)}
      >
        »
      </button>
    </div>
  );
};

CollectionPagination.propTypes = {
  handlePage: propTypes.func.isRequired,
  currentPage: propTypes.number.isRequired,
  totalPage: propTypes.number.isRequired,
};
