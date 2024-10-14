import SideBar from './pages/MainView/SideBar/SideBar';
import { GlobalStyleStyled } from './pages/GlobalStyle.styled';
import styled from 'styled-components';
import MainPage from './pages/MainView/MainPage/MainPage';
import { ModalPortal } from './pages/Modal/ModalPortal/ModalPortal';
import ModalView from './pages/Modal/ModalView/ModalView';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CreateProject from './pages/CreateProject/CreateProject';
import ViewProject from './pages/ViewProject/ViewProject';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import PasswordResetPage from './pages/PasswordResetFormPage/PasswordResetFormPage';
import PasswordResetLinkPage from './pages/PasswordResetLinkPage/PasswordResetLinkPage';
import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute';
import { useUserStore } from './stores/UserStore/userStore';
import { useEffect } from 'react';
import AuthLayout from './layouts/AuthLayout';

const MainDiv = styled.div`
  display: flex;
  background-color: #d9d9d9;
  width: 100%;
  height: 100vh;
`;

function App() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const restoreLogin = useUserStore((state) => state.restoreLogin);

  useEffect(() => {
    restoreLogin();
  }, [restoreLogin]);

  return (
    <BrowserRouter>
      <GlobalStyleStyled />
      <Routes>
        <Route path="*" element={<Navigate to={isLoggedIn ? '/main' : '/login'} />} />
        <Route element={<ProtectedRoute />}>
          <Route
            path="/main"
            element={
              <MainDiv>
                <SideBar />
                <MainPage />
              </MainDiv>
            }
          />
        </Route>
        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/main" replace /> : <LoginPage />}
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/password-reset" element={<PasswordResetPage />} />
          <Route path="/password-reset/confirm" element={<PasswordResetLinkPage />} />
        </Route>
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
