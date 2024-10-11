import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #d9d9d9;
  padding: 20px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
`;

export const BackBtn = styled.button`
  display: flex;
  align-items: center;
  border: none;
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
  align-self: flex-start;

  @media (max-width: 768px) {
    margin-right: auto;
  }
`;

export const BackBtnText = styled.div`
  margin-left: 5px;
  font-weight: 600;
`;

export const Content = styled.div`
  width: 70rem;
  height: 43.75rem;
  background-color: #ffffff;
  border-radius: 9px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1024px) {
    width: 100%;
    height: auto;
    padding: 20px;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
  }
`;

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 35rem;
  width: 55rem;

  @media (max-width: 1024px) {
    width: 100%;
    height: auto;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Input = styled.input`
  width: 20rem;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const TextArea = styled.textarea`
  width: 35rem;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;

  @media (max-width: 1024px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const DateBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const DateText = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-right: 10px;
`;

export const DateInput = styled.div`
  display: flex;
  align-items: center;
  width: 7rem;
  gap: 5px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #ffffff;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

export const DateDisplay = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

export const CalendarButton = styled.button`
  cursor: pointer;
  border: none;
  background: transparent;
`;

export const BtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 5px;
  flex-wrap: wrap;
`;

export const GreenBtn1 = styled.button`
  background-color: #9aa308;
  width: 10rem;
  padding: 5px;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const GreenBtn2 = styled.button`
  background-color: #c3c86e;
  width: 10rem;
  padding: 5px;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const MarginTop = styled.div<{ top: number }>`
  margin-top: ${({ top }) => top}px;
`;

export const MarginLeft = styled.div<{ left: number }>`
  margin-left: ${({ left }) => left}px;
`;
