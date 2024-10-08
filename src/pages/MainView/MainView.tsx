import styled from 'styled-components';
import SideBar from './SideBar/SideBar';
import MainPage from './MainPage/MainPage';
import { GlobalStyle } from '../../styles/GlobalStyle';

const MainViewDiv = styled.div`
  display: flex;
  height: 100%;
`;

export default function MainView() {
  return (
    <>
      <GlobalStyle />
      <MainViewDiv>
        <SideBar />
        <MainPage />
      </MainViewDiv>
    </>
  );
}
