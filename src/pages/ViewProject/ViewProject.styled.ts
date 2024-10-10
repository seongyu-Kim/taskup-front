// import styled from 'styled-components';

// export const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
//   background-color: #d9d9d9;

// `;

// export const ContentContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   position: relative;
//   align-items: center;
// `;

// export const BackBtn = styled.button`
//   display: flex;
//   align-items: center;
//   border: none;
//   cursor: pointer;
//   background: transparent;
//   font-size: 16px;
//   font-weight: 600;
//   margin-bottom: 10px;
//   margin-right: 1100px;
// `;

// export const BackBtnText = styled.div`
//   margin-left: 5px;
//   font-weight: 600;
// `;

// export const Content = styled.div`
//   width: 70rem;
//   height: 43.75rem;
//   background-color: #ffffff;
//   border-radius: 9px;
//   display: flex;
//   justify-content: center;
//   align-items: center;

// `;

// export const ContentBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: 35rem;
//   width: 55rem;
// `;

// export const ContentFlex = styled.div`
//   display: flex;
// `;

// export const ContentTitle = styled.div`
//   font-size: 20px;
//   font-weight: 600;
//   width: 5rem;
//   background-color: white;
// `;

// export const ContentDescription = styled.div`
//   margin-top: 4px;
//   margin-left: 100px;
//   width: 37rem;
//   background-color: white;
// `;

// export const ContentDate = styled.div`
//   margin-top: 4px;
//   background-color: white;
//   font-weight: 600;
// `;

// export const BtnBox = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   gap: 5px;
// `;

// export const GreenBtn1 = styled.button`
//   background-color: #9aa308;
//   width: 10rem;
//   padding: 5px;
//   border: none;
//   border-radius: 4px;
//   color: white;
//   cursor: pointer;
// `;

// export const GreenBtn2 = styled.button`
//   background-color: #c3c86e;
//   width: 10rem;
//   padding: 5px;
//   border: none;
//   border-radius: 4px;
//   color: white;
//   cursor: pointer;
// `;

// export const MarginTop = styled.div<{ top: number }>`
//   margin-top: ${({ top }) => top}px;
// `;
// export const MarginLeft = styled.div<{ left: number }>`
//   margin-left: ${({ left }) => left}px;
// `;

// export const Hr = styled.hr`
//   border: none;
//   height: 1px;
//   background-color: #ccc;
//   margin: 20px 0;
// `;

// ViewProject.styled.ts

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
  width: 100%;
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
  margin-right: 1100px;

  @media (max-width: 1024px) {
    margin-right: auto;
  }

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
  height: auto;
  background-color: #ffffff;
  border-radius: 9px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  @media (max-width: 1024px) {
    width: 90%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    padding: 15px;
  }
`;

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 55rem;

  @media (max-width: 1024px) {
    width: 90%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ContentFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const ContentTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  width: 5rem;
  background-color: white;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 5px;
  }
`;

export const ContentDescription = styled.div`
  margin-top: 4px;
  margin-left: 100px;
  width: 37rem;
  background-color: white;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`;

export const ContentDate = styled.div`
  margin-top: 4px;
  background-color: white;
  font-weight: 600;
`;

export const BtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 5px;

  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }
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
    width: 8rem;
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
    width: 8rem;
  }
`;

export const MarginTop = styled.div<{ top: number }>`
  margin-top: ${({ top }) => top}px;
`;
export const MarginLeft = styled.div<{ left: number }>`
  margin-left: ${({ left }) => left}px;
`;

export const Hr = styled.hr`
  border: none;
  height: 1px;
  background-color: #ccc;
  margin: 20px 0;
`;
