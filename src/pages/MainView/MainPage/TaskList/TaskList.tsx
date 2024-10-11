import { useEffect, useState } from 'react';
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
  StyledFaCircleCheck,
  StyledFaRegCheckCircle,
} from './TaskList.styled';
import Pagination from '../../../../components/Pagination/Pagination';

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
];

export default function TaskList() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [allData, setAllData] = useState(testArr);
  const [currentData, setCurrentData] = useState<
    Array<{
      id: number;
      title: string;
      detail: string;
      checkBox: boolean;
    }>
  >([]);

  useEffect(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const paginatedData = allData.slice(startIdx, endIdx);

    setCurrentData(paginatedData);
  }, [currentPage, allData]);

  const handleCompleteClick = (id: number) => {
    setAllData((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, checkBox: !item.checkBox } : item)),
    );
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
                  <ListTextValue
                    onClick={() => {
                      handleCompleteClick(item.id);
                    }}>
                    {item.checkBox ? <StyledFaCircleCheck /> : <StyledFaRegCheckCircle />}
                  </ListTextValue>
                </ListTableBox>
              </ProjectListItem>
            ))}
          </ProjectList>
        </ProjectListContainer>
        <Pagination
          arr={testArr}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </MainPageContainer>
    </>
  );
}
