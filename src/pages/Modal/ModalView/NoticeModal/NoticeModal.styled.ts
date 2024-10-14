import styled from 'styled-components';

export const NoticeModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .closeIcon {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 15px;
    right: 15px;
    color: rgba(199, 199, 199, 0.69);
    cursor: pointer;
  }
`;
//모달 박스
export const NoticeModalBox = styled.div`
  width: 600px;
  height: 500px;
  background: #d9d9d9;
  border-radius: 10px;
  z-index: 1000;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;
//모달 헤더 박스 -
export const NoticeModalHeaderBox = styled.div`
  text-align: center;
  width: 80%;
  border-bottom: 1px solid #9c9c9c;
`;
// 모달 바디
export const NoticeModalBodyBox = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 70%;
  margin-bottom: 26px;
  ul {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    &::-webkit-scrollbar {
      display: none;
    }
    li {
      display: flex;
      justify-content: space-around;
      width: 100%;
      list-style-type: none;
      border-bottom: 1px solid #9c9c9c;
    }
  }
`;
export const NoticeText = styled.p`
  color: ${(props) => props.color};
`;

//닫기 버튼
export const NoticeModalCloseButton = styled.button`
  width: 70px;
  height: 30px;
  border: none;
  border-radius: 8px;
  background: #9aa308;
  color: white;
  cursor: pointer;
`;
