import styled from 'styled-components';
import { zIndex } from '@styles/Zindex';

export const NoticeModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: ${zIndex.modalBackGround};

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
  z-index: ${zIndex.modalBox};

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
    gap: 0;
    &::-webkit-scrollbar {
      display: none;
    }
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      list-style-type: none;
      padding: 10px 0 10px 0;
      border-bottom: 1px solid #9c9c9c;
      p {
        display: flex;
        align-items: center;
        margin: 0;
      }
    }
  }
`;
export const NoticeText = styled.p`
  text-align: center;
  cursor: pointer;
  color: ${(props) => props.color};
`;
