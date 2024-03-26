import { useState } from "react";
import { useQuery } from "./useQuery";

const usePagination = (totalPageContext, initialPage = 1) => {
  const { searchParams, setSearchParams } = useQuery();
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPage, setTotalPage] = useState(totalPageContext);

  const handlePage = (page) => {
    setCurrentPage(page);
    searchParams.set("page", page);
    setSearchParams(searchParams);
  };

  return {
    currentPage,
    totalPage,
    setTotalPage,
    handlePage,
  };
};

export default usePagination;
