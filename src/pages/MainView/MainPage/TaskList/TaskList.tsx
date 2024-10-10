import { useState } from 'react';
import {
  MainPageContainer,
  ProjectListContainer,
  ProjectListArea,
  ProjectListTitle,
  TitleText,
  ProjectListTitleName,
  ProjectList,
  ProjectListItem,
  ListTableBox,
  ListTextValue,
  ListTextNameAreaBox,
  PaginationBox,
  PaginationButton,
  PageNumText,
} from './TaskList.styled';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';

// 임시 데이터
const testArr = [
  { id: 1, title: '가', detail: '내용입니다1', checkBox: false },
  { id: 2, title: '나', detail: '내용입니다2', checkBox: false },
  { id: 3, title: '다', detail: '내용입니다3', checkBox: false },
  { id: 4, title: '라', detail: '내용입니다4', checkBox: false },
  { id: 5, title: '마', detail: '내용입니다5', checkBox: false },
  { id: 6, title: '바', detail: '내용입니다6', checkBox: false },
  { id: 7, title: '사', detail: '내용입니다7', checkBox: false },
  { id: 8, title: '아', detail: '내용입니다8', checkBox: false },
  { id: 9, title: '자', detail: '내용입니다9', checkBox: false },
  { id: 10, title: '차', detail: '내용입니다10', checkBox: false },
  { id: 11, title: '카', detail: '내용입니다11', checkBox: false },
  { id: 12, title: '타', detail: '내용입니다12', checkBox: false },
  { id: 13, title: '파', detail: '내용입니다13', checkBox: false },
  { id: 14, title: '하', detail: '내용입니다14', checkBox: false },
  { id: 15, title: '가', detail: '내용입니다15', checkBox: false },
  { id: 16, title: '나', detail: '내용입니다16', checkBox: false },
  { id: 17, title: '다', detail: '내용입니다17', checkBox: false },
  { id: 18, title: '라', detail: '내용입니다18', checkBox: false },
  { id: 19, title: '마', detail: '내용입니다19', checkBox: false },
  { id: 20, title: '바', detail: '내용입니다20', checkBox: false },
  { id: 21, title: '사', detail: '내용입니다21', checkBox: false },
  { id: 22, title: '아', detail: '내용입니다22', checkBox: false },
  { id: 23, title: '자', detail: '내용입니다23', checkBox: false },
  { id: 24, title: '차', detail: '내용입니다24', checkBox: false },
  { id: 25, title: '카', detail: '내용입니다25', checkBox: false },
  { id: 26, title: '타', detail: '내용입니다26', checkBox: false },
  { id: 27, title: '파', detail: '내용입니다27', checkBox: false },
  { id: 28, title: '하', detail: '내용입니다28', checkBox: false },
  { id: 29, title: '가', detail: '내용입니다29', checkBox: false },
  { id: 30, title: '나', detail: '내용입니다30', checkBox: false },
  { id: 31, title: '다', detail: '내용입니다31', checkBox: false },
  { id: 32, title: '라', detail: '내용입니다32', checkBox: false },
  { id: 33, title: '마', detail: '내용입니다33', checkBox: false },
  { id: 34, title: '바', detail: '내용입니다34', checkBox: false },
  { id: 35, title: '사', detail: '내용입니다35', checkBox: false },
  { id: 36, title: '아', detail: '내용입니다36', checkBox: false },
  { id: 37, title: '자', detail: '내용입니다37', checkBox: false },
  { id: 38, title: '차', detail: '내용입니다38', checkBox: false },
  { id: 39, title: '카', detail: '내용입니다39', checkBox: false },
  { id: 40, title: '타', detail: '내용입니다40', checkBox: false },
  { id: 41, title: '파', detail: '내용입니다41', checkBox: false },
  { id: 42, title: '하', detail: '내용입니다42', checkBox: false },
  { id: 43, title: '가', detail: '내용입니다43', checkBox: false },
  { id: 44, title: '나', detail: '내용입니다44', checkBox: false },
  { id: 45, title: '다', detail: '내용입니다45', checkBox: false },
  { id: 46, title: '라', detail: '내용입니다46', checkBox: false },
  { id: 47, title: '마', detail: '내용입니다47', checkBox: false },
  { id: 48, title: '바', detail: '내용입니다48', checkBox: false },
  { id: 49, title: '사', detail: '내용입니다49', checkBox: false },
  { id: 50, title: '아', detail: '내용입니다50', checkBox: false },
  { id: 51, title: '아', detail: '내용입니다51', checkBox: false },
  { id: 43, title: '가', detail: '내용입니다43', checkBox: false },
  { id: 44, title: '나', detail: '내용입니다44', checkBox: false },
  { id: 45, title: '다', detail: '내용입니다45', checkBox: false },
  { id: 46, title: '라', detail: '내용입니다46', checkBox: false },
  { id: 47, title: '마', detail: '내용입니다47', checkBox: false },
  { id: 48, title: '바', detail: '내용입니다48', checkBox: false },
  { id: 49, title: '사', detail: '내용입니다49', checkBox: false },
  { id: 50, title: '아', detail: '내용입니다50', checkBox: false },
  { id: 51, title: '아', detail: '내용입니다51', checkBox: false },
];
const itemsPerPage = 10;

export default function TaskList() {
  const totalItems = testArr.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const currentData = testArr.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
    <>
      <MainPageContainer>
        <ProjectListContainer>
          <ProjectListArea>
            <ProjectListTitle>
              <TitleText>Num</TitleText>
            </ProjectListTitle>
            <ProjectListTitleName>
              <TitleText>Name</TitleText>
            </ProjectListTitleName>
            <ProjectListTitle>
              <TitleText>CheckBox</TitleText>
            </ProjectListTitle>
          </ProjectListArea>
          <ProjectList>
            {currentData.map((item) => (
              <ProjectListItem
                backgroundColor={item.id % 2 === 0 ? '#e0e0e0' : 'white'}
                key={item.id}>
                <ListTableBox>
                  <ListTextValue>{item.id}</ListTextValue>
                </ListTableBox>
                <ListTextNameAreaBox>
                  <ListTextValue>{item.title}</ListTextValue>
                  <ListTextValue className="detail">{item.detail}</ListTextValue>
                </ListTextNameAreaBox>
                <ListTableBox>
                  <ListTextValue>{item.checkBox.toString()}</ListTextValue>
                </ListTableBox>
              </ProjectListItem>
            ))}
          </ProjectList>
        </ProjectListContainer>
        <PaginationBox>
          <PaginationButton onClick={goToPreviousPage} disabled={currentPage === 1}>
            <GrFormPrevious className="icons" />
          </PaginationButton>
          {[...Array(totalPages)].map((_, index) => (
            <PageNumText
              onClick={() => goToPage(index)}
              key={index}
              isActive={currentPage === index + 1}>
              {index + 1}
            </PageNumText>
          ))}
          <PaginationButton onClick={goToNextPage} disabled={currentPage === totalPages}>
            <GrFormNext className="icons" />
          </PaginationButton>
        </PaginationBox>
      </MainPageContainer>
    </>
  );
}
