import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

export const Pagination = () => {
  const { search } = useLocation();
  const { page } = queryString.parse(search);

  const parsedPage = Number(page) || 1;

  const navigate = useNavigate();

  const handleNextPage = () => {
    if (page === undefined) {
      navigate(`?page=2`);
      return;
    }

    navigate(`?page=${parsedPage + 1}`);
  };

  const handlePrevPage = () => {
    if (page === "1") return;

    navigate(`?page=${parsedPage - 1}`);
  };

  return (
    <>
      <div className="join m-6">
        <button
          className="btn join-item disabled:opacity-50"
          onClick={handlePrevPage}
          disabled={parsedPage === 1 || parsedPage === undefined ? true : false}
        >
          «
        </button>
        <button className="btn join-item">Página {parsedPage ?? 1}</button>
        <button className="btn join-item" onClick={handleNextPage}>
          »
        </button>
      </div>
    </>
  );
};
