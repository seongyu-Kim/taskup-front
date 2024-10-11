import styled from 'styled-components';

const breakpoints = {
  desktop: '1024px',
  tablet: '768px',
  mobile: '480px',
};

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d9d9d9;
  width: 100%;
  height: 100vh;
  padding: 0 1rem;

  @media (max-width: ${breakpoints.tablet}) {
    height: auto;
    padding: 2rem 1rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 55%;

  @media (max-width: ${breakpoints.desktop}) {
    width: 70%;
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 90%;
  }
`;

export const ResetLinkView = styled.div`
  width: 50%;
  height: 50%;
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: ${breakpoints.desktop}) {
    width: 70%;
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 90%;
  }
`;

export const MainView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  padding: 2rem;

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    color: #2d3f63;

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 1.2rem;
    }
  }

  p {
    text-align: center;
    color: #666;
    font-size: 1rem;
    margin-bottom: 1rem;

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 0.9rem;
    }
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
  margin-bottom: 0.6rem;

  label {
    width: 20%;
    font-size: 0.8rem;
    font-weight: bold;
  }

  input {
    margin-left: 0.2rem;
    border: none;
    outline: none;
    width: 100%;
    &::placeholder {
      font-size: 0.7rem;
    }
  }
`;

export const ErrorText = styled.p`
  width: 100%;
  font-size: 0.7rem;
  text-align: left;
  margin-left: 0.5rem;
  margin-bottom: 0.6rem;
  color: #f93737;
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
`;

export const SuccessText = styled.div`
  text-align: center;
  color: #2d3f63;
  font-size: 1rem;

  a {
    display: block;
    margin-top: 1rem;
    color: #3c4e78;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
