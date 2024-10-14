export interface PaginationProps {
  arr: Array<{
    id: number;
    title: string;
    content: string;
    status: number;
  }>; // 데이터 배열
  itemsPerPage: number; // 페이지 당 아이템 수
  currentPage: number; // 현재 페이지
  setCurrentPage: (page: number) => void; // 페이지 설정 함수
}
