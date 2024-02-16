import { useState, useEffect } from "react";
import { useSearchParamsQuery } from "../../../../hooks/useSearchParamsQuery";

export const GamesPagination = () => {
  const { addQueryParam } = useSearchParamsQuery();
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    addQueryParam("page", currentPage);
  }, [currentPage]);

  return (
    <div className="flex justify-center w-full gap-x-2">
      <button
        disabled={currentPage <= 1}
        className="p-2 font-bold rounded-lg bg-base-content text-base-100 hover:bg-base-content/70 disabled:bg-opacity-20 disabled:pointer-events-none"
        onClick={() => handlePrevPage()}
      >
        Prev
      </button>
      <button
        className="p-2 font-bold rounded-lg bg-base-content text-base-100 hover:bg-base-content/70"
        onClick={() => handleNextPage()}
      >
        Next
      </button>
    </div>
  );
};
