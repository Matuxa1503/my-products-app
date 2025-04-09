export interface IPagination {
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
  prevPage: () => void;
  nextPage: () => void;
}
