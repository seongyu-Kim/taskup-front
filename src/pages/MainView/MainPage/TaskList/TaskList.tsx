import styled from 'styled-components';
import MainPageDetailProps from '../../../../types/MainPageDetailType';

//페이지 리스트 컨테이너
const MainPageContainer = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #d9d9d9;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

// 프로젝트 리스트 박스
const ProjectListContainer = styled.div`
  margin-top: 50px;
  background: white;
  width: 70rem;
  height: 15rem;
  border: 1px solid black;
`;

// 프로젝트 리스트 영역
const ProjectListArea = styled.div`
  display: flex;
  align-items: center;
`;

// 리스트 Num Name CheckBox 제목 부분
const ProjectListTitle = styled.div`
  background-color: #647ea1;
  margin: 0;
  flex: 1;
`;
// 리스트 Name 타이틀 영역 크기
const ProjectListTitleName = styled(ProjectListTitle)`
  border-right: 1px solid #9c9c9c;
  border-left: 1px solid #9c9c9c;
  flex: 2;
`;

// 제목 부분
const TitleText = styled.p`
  margin: 2px;
  color: white;
  text-align: center; // 텍스트 중앙 정렬
`;

// ul 태그 스크롤 추가
const ProjectList = styled.ul`
  overflow-y: auto;
  height: 13.2rem;
  margin: 0;
  padding: 0;
  &::-webkit-scrollbar {
    display: none;
  }
`;

// li 태그
const ProjectListItem = styled.li<MainPageDetailProps>`
  background-color: ${(props) => props.backgroundColor};
  //padding: 5px;
  list-style-type: none;
  display: flex;
  align-items: center;
`;

// li 태그 아래 리스트 테이블
const ListTableBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0;
  flex: 1;
`;
// 프로젝트 리스트 항목 이름 아이디/내용/체크박스
const ListTextValue = styled.p`
  flex: 1;
  margin: 5px 0 5px 0;
  text-align: center;
`;
// 이름 필드
const ListTextNameAreaBox = styled(ListTableBox)`
  border-left: 1px solid #9c9c9c;
  border-right: 1px solid #9c9c9c;
  flex: 2;
`;
//페이지 네이션 부분
const PaginationBox = styled.div`
  display: flex;
  gap: 5px;
`;

//테스트용 임시 값 추후 삭제
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
];

export default function TaskList() {
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
          {testArr.map((item, index) => (
            <ProjectListItem
              backgroundColor={item.id % 2 == 0 ? '#e0e0e0' : 'white'}
              id={item.id.toString()}>
              <ListTableBox>
                <ListTextValue>{item.id}</ListTextValue>
              </ListTableBox>
              <ListTextNameAreaBox>
                <ListTextValue>{item.name}</ListTextValue>
              </ListTextNameAreaBox>
              {/*체크박스는 임시 값*/}
              <ListTextValue>{item.checkBox.toString()}</ListTextValue>
            </ProjectListItem>
          ))}
        </ProjectList>
      </ProjectListContainer>
      <PaginationBox>
        <button>이전</button>
        <p>1</p>
        <button>다음</button>
      </PaginationBox>
    </MainPageContainer>
  );
}
