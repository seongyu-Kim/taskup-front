import styled from 'styled-components';
import { MainPageDetailProps } from '../../../../types/MainPageDetailType';

// 페이지 리스트 컨테이너
export const MainPageContainer = styled.div`
  height: 40%;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  border-bottom: 1px solid black;
`;

// 프로젝트 리스트 박스
export const ProjectListContainer = styled.div`
  margin-top: 50px;
  background: white;
  width: 100%;
  height: 100%;
  border: 1px solid #9c9c9c;
`;

// 프로젝트 리스트 영역
export const ProjectListArea = styled.div`
  display: flex;
  align-items: center;
`;

// 리스트 Num Name CheckBox 제목 부분
export const ProjectListTitle = styled.div`
  background-color: #647ea1;
  margin: 0;
  flex: 1;
`;

// 리스트 Name 타이틀 영역 크기
export const ProjectListTitleName = styled(ProjectListTitle)`
  border-right: 1px solid #9c9c9c;
  border-left: 1px solid #9c9c9c;
  flex: 2;
`;

// 제목 부분
export const TitleText = styled.p`
  margin: 2px;
  color: white;
  text-align: center;
`;

// ul 태그 스크롤 추가
export const ProjectList = styled.ul`
  overflow-y: auto;
  height: 14.3rem;
  margin: 0;
  padding: 0;
  &::-webkit-scrollbar {
    display: none;
  }
`;

// li 태그
export const ProjectListItem = styled.li<MainPageDetailProps>`
  background-color: ${(props) => props.backgroundColor};
  list-style-type: none;
  display: flex;
  align-items: center;
`;

// li 태그 아래 리스트 테이블
export const ListTableBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0;
  flex: 1;
  border-bottom: 1px solid #9c9c9c;

  height: 80px;
`;

// 프로젝트 리스트 항목 이름 아이디/내용/체크박스
export const ListTextValue = styled.p`
  flex: 1;
  margin: 5px 0 5px 0;
  text-align: center;
`;

// 이름 필드
export const ListTextNameAreaBox = styled(ListTableBox)`
  border-left: 1px solid #9c9c9c;
  border-right: 1px solid #9c9c9c;
  flex: 2;

  display: flex;
  flex-direction: column;
  height: 80px;
`;

// 페이지 네이션 부분
export const PaginationBox = styled.div`
  display: flex;
  gap: 5px;
`;

// 페이지 네이션 버튼
export const PaginationButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
  font-size: 16px;
`;

export const PageNumText = styled.p<{ isActive: boolean }>`
  cursor: pointer;
  color: ${(props) => (props.isActive ? 'black' : 'gray')};
`;
