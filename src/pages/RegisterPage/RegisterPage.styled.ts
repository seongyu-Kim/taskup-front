import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d9d9d9;
  width: 100%;
  height: 100vh;
`;

export const LoginView = styled.div`
  width: 964px;
  height: 599px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
`;

export const Sidebar = styled.div`
  display: flex;
  align-items: center;
  width: 33%;
  height: 100%;
  background-color: #2d3f63;
  img {
    width: 100%;
  }
`;

export const MainView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  height: 100%;
  background-color: #fff;
  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    span {
      color: #9aa308;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 55%;
`;

export const ErrorText = styled.p`
  width: 100%;
  font-size: 0.7rem;
  text-align: left;
  margin-left: 10px;
  color: #f93737;
  text-decoration: underline;
`;

export const InputBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #222;
  box-sizing: border-box;
  position: relative;
  label {
    width: 60px;
    font-size: 13px;
    font-weight: bold;
  }
  input {
    margin-left: 0.2rem;
    border: none;
    outline: none;
    width: calc(100% - 60px);
  }
  p {
    font-size: 0.6rem;
    color: #f93737;
    position: absolute;
    top: 12px;
    right: 12px;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 8px 0;
  border-radius: 8px;
  border: none;
  font-weight: bold;
  background-color: #2d3f63;
  color: #fff;
  border: 1px solid #2d3f63;
`;
