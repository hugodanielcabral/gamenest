import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const GamesPagination = ({ currentPage, totalPages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(currentPage);

  const handleNextPage = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    setPage((prev) => prev + 1);
    newSearchParams.set("page", page + 1);
    setSearchParams(newSearchParams);
  };

  const handlePrevPage = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    setPage((prev) => prev - 1);
    newSearchParams.set("page", page - 1);
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  return (
    <div className="flex justify-center join">
      <button
        className="join-item btn btn-error"
        onClick={handlePrevPage}
        disabled={currentPage <= 1 ? true : false}
      >
        «
      </button>
      <button className="join-item btn btn-info text-base-100">
        Page {currentPage}
      </button>
      <button
        className="join-item btn btn-error"
        onClick={handleNextPage}
        disabled={currentPage === totalPages ? true : false}
      >
        »
      </button>
    </div>
  );
};

GamesPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};
