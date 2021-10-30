import { useState, useEffect } from "react";

const usePagination = (itemsTotal: number) => {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const perPage = 5;

  useEffect(() => {
    // setTotalPages
    setTotalPages(Math.round(itemsTotal / perPage));
  }, [itemsTotal]);
  useEffect(() => {
    let arr = [];
    for (let i = 0; i <= totalPages - 1; i++) {
      arr.push(i);
    }
    setPageNumbers(arr);
  }, [totalPages]);

  // user clicks next page
  const handleNextPage = () => {
    if (page >= totalPages) return;
    setPage((page) => page + 1);
  };

  // user clicks prev page
  const handlePrevPage = () => {
    if (page === 0) return;
    setPage((page) => page - 1);
  };

  const goToPage = (page: number) => {
    setPage(page);
  };

  return { page, perPage, totalPages, handlePrevPage, handleNextPage, pageNumbers, goToPage };
};

export default usePagination;
