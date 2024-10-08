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

// 임시 데이터
const testArr = [
  { id: 1, name: '가', checkBox: false },
  { id: 2, name: '나', checkBox: false },
  { id: 3, name: '다', checkBox: false },
  { id: 4, name: '라', checkBox: false },
  { id: 5, name: '마', checkBox: false },
  { id: 6, name: '바', checkBox: false },
  { id: 7, name: '사', checkBox: false },
  { id: 8, name: '아', checkBox: false },
  { id: 9, name: '자', checkBox: false },
  { id: 10, name: '차', checkBox: false },
  { id: 11, name: '카', checkBox: false },
  { id: 12, name: '타', checkBox: false },
  { id: 13, name: '파', checkBox: false },
  { id: 14, name: '하', checkBox: false },
  { id: 15, name: '가', checkBox: false },
  { id: 16, name: '나', checkBox: false },
  { id: 17, name: '다', checkBox: false },
  { id: 18, name: '라', checkBox: false },
  { id: 19, name: '마', checkBox: false },
  { id: 20, name: '바', checkBox: false },
  { id: 21, name: '사', checkBox: false },
  { id: 22, name: '아', checkBox: false },
  { id: 23, name: '자', checkBox: false },
  { id: 24, name: '차', checkBox: false },
  { id: 25, name: '카', checkBox: false },
  { id: 26, name: '타', checkBox: false },
  { id: 27, name: '파', checkBox: false },
  { id: 28, name: '하', checkBox: false },
  { id: 29, name: '가', checkBox: false },
  { id: 30, name: '나', checkBox: false },
  { id: 31, name: '다', checkBox: false },
  { id: 32, name: '라', checkBox: false },
  { id: 33, name: '마', checkBox: false },
  { id: 34, name: '바', checkBox: false },
  { id: 35, name: '사', checkBox: false },
  { id: 36, name: '아', checkBox: false },
  { id: 37, name: '자', checkBox: false },
  { id: 38, name: '차', checkBox: false },
  { id: 39, name: '카', checkBox: false },
  { id: 40, name: '타', checkBox: false },
  { id: 41, name: '파', checkBox: false },
  { id: 42, name: '하', checkBox: false },
  { id: 43, name: '가', checkBox: false },
  { id: 44, name: '나', checkBox: false },
  { id: 45, name: '다', checkBox: false },
  { id: 46, name: '라', checkBox: false },
  { id: 47, name: '마', checkBox: false },
  { id: 48, name: '바', checkBox: false },
  { id: 49, name: '사', checkBox: false },
  { id: 50, name: '아', checkBox: false },
  { id: 51, name: '아', checkBox: false },
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
                <ListTextValue>{item.name}</ListTextValue>
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
          [이전]
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
          [다음]
        </PaginationButton>
      </PaginationBox>
    </MainPageContainer>
  );
}
