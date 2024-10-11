import styled from 'styled-components';

const breakpoints = {
  desktop: '1024px',
  tablet: '768px',
  mobile: '480px',
};

export const MainView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 67%;
  height: 100%;
  background-color: #fff;
  padding: 2rem;

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    color: #2d3f63;
    margin: 0;
  }

  h3 {
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0;

    @media (max-width: ${breakpoints.tablet}) {
      font-size: 1.3rem;
      text-align: center;
    }

    span {
      color: #9aa308;
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    padding: 1.5rem;
    box-sizing: border-box;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;

  @media (max-width: ${breakpoints.desktop}) {
    width: 70%;
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 90%;
  }
`;

export const ErrorText = styled.p`
  width: 100%;
  font-size: 0.7rem;
  text-align: left;
  margin-left: 0.5rem;
  margin-bottom: 0.6rem;
  color: #f93737;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.6rem;
    margin-left: 0.2rem;
  }
`;

export const InputBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #222;
  box-sizing: border-box;
  position: relative;
  margin-bottom: 0.6rem;

  label {
    width: 20%;
    font-size: 0.8rem;
    font-weight: bold;

    @media (max-width: ${breakpoints.tablet}) {
      width: 25%;
      font-size: 0.7rem;
    }

    @media (max-width: ${breakpoints.mobile}) {
      width: 30%;
    }
  }

  input {
    margin-left: 0.2rem;
    border: none;
    outline: none;
    width: 100%;
    &::placeholder {
      font-size: 0.7rem;
    }

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 0.65rem;
    }
  }

  p {
    font-size: 0.6rem;
    color: #f93737;
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;

    @media (max-width: ${breakpoints.mobile}) {
      top: 0.5rem;
      right: 0.5rem;
    }
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.5rem 0;
  border-radius: 0.5rem;
  border: none;
  font-weight: bold;
  background-color: #2d3f63;
  color: #fff;
  border: 1px solid #2d3f63;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3c4e78;
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    padding: 0.6rem 0;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0.8rem 0;
  }
`;

export const ButtonBox = styled.div`
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-top: 1rem;
  a {
    color: #8c9499;
    text-decoration: none;
  }
`;
