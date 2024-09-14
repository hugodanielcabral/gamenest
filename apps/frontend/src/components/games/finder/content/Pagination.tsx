import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDataFetch } from "../../../../hooks/useDataFetch";
import queryString from "query-string";

interface PaginationProps {
  fetchData: {
    count: number;
  };
  isLoading?: boolean;
}

export const Pagination = () => {
  const { search } = useLocation();
  const query = queryString.parse(search);
  const parsedQuery = new URLSearchParams(
    query as Record<string, string>,
  ).toString();

  
  
  let page = query.page ? query.page : "1";
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const { fetchData: totalPages } = useDataFetch(
    "count/games",
    `${parsedQuery}`,
  ) as unknown as PaginationProps;
  
  const totalPagesCount = Math.ceil(totalPages.count / 21);
  console.log(totalPagesCount);

  const handleNextPage = () => {
    if (Number(page) < totalPagesCount && typeof page === "string") {
      let parsedPage = parseInt(page);
      const search = new URLSearchParams(searchParams);
      search.set("page", String(parsedPage + 1));
      navigate(`?${search}`);
    }
  };

  const handlePrevPage = () => {
    if (Number(page) > 1 && typeof page === "string") {
      let parsedPage = parseInt(page);
      const search = new URLSearchParams(searchParams);
      search.set("page", String(parsedPage - 1));
      navigate(`?${search}`);
    }
  };
  

  return (
    <div className="join m-6">
      <button
        className="btn join-item disabled:opacity-50"
        onClick={handlePrevPage}
        disabled={Number(page) === 1}
      >
        «
      </button>
      <button className="btn join-item">Página {page}</button>
      <button
        className="btn join-item"
        onClick={handleNextPage}
        disabled={Number(page) >= totalPagesCount}
      >
        »
      </button>
    </div>
  );
};
