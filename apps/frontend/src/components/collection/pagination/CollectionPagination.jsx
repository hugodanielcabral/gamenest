import propTypes from "prop-types";

export const CollectionPagination = ({
  handlePage,
  currentPage,
  totalPage,
}) => {
  console.log(currentPage, totalPage);
  return (
    <div
      className={`join col-span-4 mx-auto min-h-96 items-end ${
        totalPage <= 1 ? "hidden" : "block"
      }`}
    >
      <button
        className="join-item btn"
        disabled={currentPage <= 1}
        onClick={() => handlePage(currentPage - 1)}
      >
        «
      </button>
      <button className="join-item btn">{currentPage}</button>
      <button
        className="join-item btn"
        disabled={currentPage >= totalPage}
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
