import { useDataFetch } from "../../../hooks/useDataFetch";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { Loading } from "../../ui/loading/Loading.tsx";

interface CountCollection {
  count: number;
}

export const CollectionPagination = () => {
  const { getQueryString, query, setParams } = useQueryParams();

  const page = query.page ? query.page : "1";

  const { fetchData: totalPages, isLoading, error } = useDataFetch<CountCollection>(
    "collection/totalPages",
    `${getQueryString()}`,
  );

  if (isLoading) return null
  

  if (error) {
    return (
      <div className="m-6 text-red-500 text-center">
        Ocurrió un error al cargar los datos: {error}
      </div>
    );
  }

  if (!totalPages) {
    return null;
  }

  const totalPagesCount = Math.ceil(totalPages.count / 12);

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
