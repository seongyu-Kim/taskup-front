import React from 'react';
import styled from 'styled-components';

const breakpoints = {
  tablet: '768px',
};

const SidebarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 33%;
  height: 100%;
  background-color: #2d3f63;

  img {
    width: 100%;
    max-width: 200px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    height: 20%;
    padding: 1rem 0;
  }
`;

const RegisterSidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <img src="./logo_color.png" alt="TaskUp logo" />
    </SidebarContainer>
  );
};

export default RegisterSidebar;
