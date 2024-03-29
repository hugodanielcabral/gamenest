import { useEffect, useState } from "react";
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

  useEffect(() => {
    setCurrentPage(parseInt(searchParams.get("page")) || initialPage);
  }, []);

  return {
    currentPage,
    setCurrentPage,
    totalPage,
    setTotalPage,
    handlePage,
  };
};

export default usePagination;
