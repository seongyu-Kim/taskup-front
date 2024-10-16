import * as Styled from '@components/Pagination/Pagination.styled';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { PaginationProps } from '@/type/PaginationType';

export default function Pagination({
  pageLength,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const totalPages = Math.ceil(pageLength / itemsPerPage); //총 페이지
  const pageGroup = Math.ceil(currentPage / itemsPerPage); // 페이지 그룹 계산
  const viewPageFirst = (pageGroup - 1) * itemsPerPage + 1; // 페이지 그룹의 첫번째 페이지 번호
  const viewPageLast = Math.min(pageGroup * itemsPerPage, totalPages); // 페이지 그룹의 마지막 페이지 번호

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (index: number) => {
    setCurrentPage(index + 1);
  };

  return (
    <Styled.PaginationBox>
      <Styled.PaginationButton onClick={goToPreviousPage} disabled={currentPage === 1}>
        <GrFormPrevious className="icons" />
      </Styled.PaginationButton>
      {pageLength === 0 ? (
        <div></div>
      ) : (
        [...Array(viewPageLast - viewPageFirst + 1)].map((_, index) => {
          const page = viewPageFirst + index;
          return (
            <Styled.PageNumText
              onClick={() => goToPage(page - 1)}
              key={page}
              isActive={currentPage === page}>
              {page}
            </Styled.PageNumText>
          );
        })
      )}
      <Styled.PaginationButton onClick={goToNextPage} disabled={currentPage === totalPages}>
        <GrFormNext className="icons" />
      </Styled.PaginationButton>
    </Styled.PaginationBox>
  );
}
