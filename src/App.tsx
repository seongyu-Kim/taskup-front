import SideBar from './pages/MainView/SideBar/SideBar';
import { GlobalStyleStyled } from './pages/GlobalStyle.styled';
import styled from 'styled-components';
import MainPage from './pages/MainView/MainPage/MainPage';

const MainDiv = styled.div`
  display: flex;
  background-color: #d9d9d9;
  width: 100%;
  height: 100vh;
`;

function App() {
  return (
    <MainDiv>
      <GlobalStyleStyled />
      <SideBar />
      <MainPage />
    </MainDiv>
  );
}

export default App;
