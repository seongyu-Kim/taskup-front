export interface MainPageDetailProps {
  backgroundColor: string;
}

//페이지네이션
export interface PaginationProps {
  totalItem: number;
  pageItemCount: number;
  pageCount: number;
  currentPage: number;
}
