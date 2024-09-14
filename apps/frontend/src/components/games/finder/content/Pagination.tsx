import { useDataFetch } from "../../../../hooks/useDataFetch";
import { useQueryParams } from "../../../../hooks/useQueryParams";

interface PaginationProps {
  fetchData: {
    count: number;
  };
  isLoading?: boolean;
}

export const Pagination = () => {
  const { getQueryString, query, setParams } = useQueryParams();

  let page = query.page ? query.page : "1";

  const { fetchData: totalPages } = useDataFetch(
    "count/games",
    `${getQueryString()}`,
  ) as unknown as PaginationProps;

  const totalPagesCount = Math.ceil(totalPages.count / 12);

  const handleNextPage = () => {
    if (Number(page) < totalPagesCount && typeof page === "string") {
      let parsedPage = parseInt(page);
      setParams("page", String(parsedPage + 1));
    }
  };

  const handlePrevPage = () => {
    if (Number(page) > 1 && typeof page === "string") {
      let parsedPage = parseInt(page);
      setParams("page", String(parsedPage - 1));
    }
  };

  return (
    <div className="join m-6 border-2 border-gray-700">
      <button
        className="btn join-item bg-base-100 disabled:opacity-90"
        onClick={handlePrevPage}
        disabled={Number(page) === 1}
      >
        «
      </button>
      <button className="btn join-item bg-base-100">Página {page}</button>
      <button
        className="btn join-item bg-base-100"
        onClick={handleNextPage}
        disabled={Number(page) >= totalPagesCount}
      >
        »
      </button>
    </div>
  );
};
