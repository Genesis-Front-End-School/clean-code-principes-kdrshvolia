import { useMemo, useState } from "react";

export const usePagination = <T>(items: T[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pagesCount = Math.ceil(items.length / itemsPerPage);

  const next = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, pagesCount));
  };

  const prev = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  const showedData = useMemo(
    () =>
      items.slice(
        (currentPage - 1) * itemsPerPage,
        (currentPage - 1) * itemsPerPage + itemsPerPage
      ),
    [items, currentPage, itemsPerPage]
  );

  const goToPage = (page: number) => {
    const pageNumber = Math.max(1, page);
    setCurrentPage(Math.min(pageNumber, pagesCount));
  };

  return {
    next,
    prev,
    goToPage,
    currentPage,
    setCurrentPage,
    pagesCount,
    showedData,
  };
};
