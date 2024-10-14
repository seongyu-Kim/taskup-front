import styled from 'styled-components';

// 페이지 네이션 부분
export const PaginationBox = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;

// 페이지 네이션 버튼
export const PaginationButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
  font-size: 16px;
  .icons {
    width: 25px;
    height: 25px;
    margin-top: 5px;
  }
`;

export const PageNumText = styled.p<{ isActive: boolean }>`
  cursor: pointer;
  color: ${(props) => (props.isActive ? 'black' : 'gray')};
`;
