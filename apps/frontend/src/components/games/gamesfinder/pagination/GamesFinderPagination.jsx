import propTypes from "prop-types";
import { useSearchParameters } from "../../../../hooks/useSearchParameters";
import { scrollTo } from "../../../../utils/scrollTo";

export const GamesFinderPagination = ({ totalPages, currentPage }) => {
  const { setParams } = useSearchParameters({
    page: currentPage,
  });

  const handleOnClick = (page) => {
    setParams({ page });
  };

  return (
    <div className="join *:border-white/10">
      <button
        className="join-item btn"
        disabled={currentPage <= 1}
        onClick={() => {
          handleOnClick(currentPage - 1);
          scrollTo();
        }}
      >
        «
      </button>

      <button className="join-item btn">{currentPage}</button>
      <button
        className="join-item btn"
        disabled={currentPage >= totalPages}
        onClick={() => {
          handleOnClick(currentPage + 1);
          scrollTo();
        }}
      >
        »
      </button>
    </div>
  );
};

GamesFinderPagination.propTypes = {
  totalPages: propTypes.number,
  currentPage: propTypes.number,
};
