import SideBar from './pages/MainView/SideBar/SideBar';
import { GlobalStyleStyled } from './pages/GlobalStyle.styled';
import styled from 'styled-components';
import MainPage from './pages/MainView/MainPage/MainPage';
import { ModalPortal } from './pages/Modal/ModalPortal/ModalPortal';
import ModalView from './pages/Modal/ModalView/ModalView';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateProject from './pages/CreateProject/CreateProject';
import ViewProject from './pages/ViewProject/ViewProject';

const MainDiv = styled.div`
  display: flex;
  background-color: #d9d9d9;
  width: 100%;
  height: 100vh;
`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyleStyled />
      <Routes>
        <Route
          path="/main"
          element={
            <MainDiv>
              <SideBar />
              <MainPage />
            </MainDiv>
          }
        />
        <Route path="/create" element={<CreateProject />} />
        <Route path="/view" element={<ViewProject />} />
      </Routes>
      <ModalPortal>
        <ModalView />
      </ModalPortal>
    </BrowserRouter>
  );
}

export default App;
