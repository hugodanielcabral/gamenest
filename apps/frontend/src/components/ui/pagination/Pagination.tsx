import { useQueryParams } from "../../../hooks/useQueryParams";

export const Pagination = ({ totalPages }: { totalPages: number }) => {
  const { query, setParams } = useQueryParams();

  const page = query.page ? query.page : "1";

  if (!totalPages) return;

  const totalPagesCount = Math.ceil(totalPages / 18);

  const handleNextPage = () => {
    if (Number(page) < totalPagesCount && typeof page === "string") {
      const parsedPage = parseInt(page, 10);
      setParams("page", String(parsedPage + 1));
    }
  };

  const handlePrevPage = () => {
    if (Number(page) > 1 && typeof page === "string") {
      const parsedPage = parseInt(page, 10);
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
