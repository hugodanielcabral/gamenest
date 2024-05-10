import { useEffect, useState } from "react";
import { useUpdateUrlAndNavigate } from "./useUpdateUrlAndNavigate";

export const usePagination = (totalPages = 0) => {
  const { updateUrlAndNavigate, urlSearchParams } = useUpdateUrlAndNavigate();

  const [currentPage, setCurrentPage] = useState(
    urlSearchParams.get("page") || 1
  );

  //? This is if i want to change the way the pagination show numbers. So, instead of <= page >=, i can use pages for something like page 1, page 2, page 3,etc...
  const pageNumberList = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    setCurrentPage(urlSearchParams.get("page") || 1);
  }, [urlSearchParams]);

  const handlePageChange = (page) => {
    updateUrlAndNavigate({
      page: page,
    });
  };

  return { currentPage, handlePageChange, pageNumberList };
};
