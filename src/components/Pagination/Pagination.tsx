import {
  PageNumText,
  PaginationBox,
  PaginationButton,
} from '../../pages/MainView/MainPage/TaskList/TaskList.styled';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { PaginationProps } from '../../types/PaginationType';

export default function Pagination({
  arr,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const totalItems = arr.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
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
      {arr.length == 0 ? (
        <div></div>
      ) : (
        [...Array(totalPages)].map((_, index) => (
          <PageNumText
            onClick={() => goToPage(index)}
            key={index}
            isActive={currentPage === index + 1}>
            {index + 1}
          </PageNumText>
        ))
      )}
      <PaginationButton onClick={goToNextPage} disabled={currentPage === totalPages}>
        <GrFormNext className="icons" />
      </PaginationButton>
    </PaginationBox>
  );
}
