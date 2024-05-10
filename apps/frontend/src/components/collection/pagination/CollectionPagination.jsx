import propTypes from "prop-types";
import { usePagination } from "../../../hooks/usePagination";
import { Pagination } from "../../ui/pagination/Pagination";

export const CollectionPagination = ({ totalPages }) => {
  const { currentPage, handlePageChange } = usePagination(totalPages);

  let parsedCurrentPage = parseInt(currentPage);

  return (
    <Pagination
      currentPage={parsedCurrentPage}
      handlePageChange={handlePageChange}
      totalPages={totalPages}
      className="col-span-4 mx-auto ring-2 ring-gray-700"
    />
  );
};

CollectionPagination.propTypes = {
  totalPages: propTypes.number.isRequired,
};

CollectionPagination.defaultProps = {
  totalPages: 0,
};
