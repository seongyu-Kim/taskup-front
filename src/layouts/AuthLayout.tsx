import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import RegisterSidebar from '../components/RegisterSidebar';

const breakpoints = {
  desktop: '1024px',
  tablet: '768px',
  mobile: '480px',
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d9d9d9;
  width: 100%;
  height: 100vh;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 0;
  }
`;

const ContentArea = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: ${breakpoints.desktop}) {
    width: 90%;
    height: 85%;
  }

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    height: 90%;
  }
`;

const AuthLayout: React.FC = () => {
  return (
    <Container>
      <ContentArea>
        <RegisterSidebar></RegisterSidebar>
        <Outlet></Outlet>
      </ContentArea>
    </Container>
  );
};

export default AuthLayout;
