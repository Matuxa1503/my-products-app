import { useState } from 'react';

export const usePagination = (itemsPerPage: number, totalItems: number) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage); // кол-во страниц
  const startIndex = (currentPage - 1) * itemsPerPage; // индекс для элементов

  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const setPage = (page: number) => setCurrentPage(page);

  return { currentPage, totalPages, startIndex, setPage, prevPage, nextPage };
};
