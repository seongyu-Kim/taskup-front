import styled from 'styled-components';
import { breakpoints } from '../../styles/Responsive.styled';

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

  @media (max-width: ${breakpoints.mobile}) {
    p {
      font-size: 0.6rem !important;
      margin-left: 0.2rem !important;
    }
  }

  p {
    width: 100%;
    font-size: 0.7rem !important;
    text-align: left !important;
    margin: 0 0 0.6rem 0.5rem !important;
    color: #f93737 !important;
  }
`;

export const MainView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  width: 67%;
  padding: 2rem;

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    color: #2d3f63;
    margin: 0;

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 1.2rem;
    }
  }

  p {
    text-align: center;
    color: #666;
    font-size: 1rem;
    margin: 0;

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 0.9rem;
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    height: 100%;
    padding: 1.5rem;
    box-sizing: border-box;
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
    width: 40%;
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

export const ErrorText = styled.p``;

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
