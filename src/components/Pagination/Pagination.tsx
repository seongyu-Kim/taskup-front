import {
  PageNumText,
  PaginationBox,
  PaginationButton,
} from '../../pages/MainView/MainPage/TaskList/TaskList.styled';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { PaginationProps } from '../../types/PaginationType';

export default function Pagination({
  pageLength,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const totalPages = Math.ceil(pageLength / itemsPerPage);
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
    <PaginationBox>
      <PaginationButton onClick={goToPreviousPage} disabled={currentPage === 1}>
        <GrFormPrevious className="icons" />
      </PaginationButton>
      {pageLength == 0 ? (
        <div></div>
      ) : (
        [...Array(totalPages)].map((_, page) => (
          <PageNumText
            onClick={() => goToPage(page)}
            key={page}
            isActive={currentPage === page + 1}>
            {page + 1}
          </PageNumText>
        ))
      )}
      <PaginationButton onClick={goToNextPage} disabled={currentPage === totalPages}>
        <GrFormNext className="icons" />
      </PaginationButton>
    </PaginationBox>
  );
}
