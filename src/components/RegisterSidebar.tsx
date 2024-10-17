import React from 'react';
import styled from 'styled-components';
import image from '../assets/logo_color.webp';

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
    /* height: auto; */
    height: 20%;
    padding: 1rem 0;
  }
`;

const RegisterSidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <img src={image} alt="TaskUp logo" />
    </SidebarContainer>
  );
};

export default RegisterSidebar;
