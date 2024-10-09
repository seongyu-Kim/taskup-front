import {
  Container,
  Sidebar,
  MainView,
  LoginView,
  InputBox,
  Form,
  SubmitButton,
  ButtonBox,
  ErrorText,
} from './LoginPage.styled';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <Container>
      <LoginView>
        <Sidebar>
          <img src="./logo_color.png" alt="TaskUp logo" />
        </Sidebar>
        <MainView>
          <h1>
            <span>TaskUp</span>과 함께하게 되신 걸 환영합니다.
          </h1>
          <Form action="">
            <InputBox>
              <label htmlFor="email">이메일</label>
              <input type="email" name="email" id="email" />
              <p></p>
            </InputBox>

            <InputBox>
              <label htmlFor="password">비밀번호</label>
              <input type="password" name="password" id="password" maxLength={10} />
            </InputBox>

            <ErrorText>이메일과 비밀번호가 일치하지 않습니다.</ErrorText>

            <SubmitButton type="submit">로그인 하기</SubmitButton>
            <ButtonBox>
              <Link to={'/register'}>회원가입</Link>
              <a href="#">비밀번호 찾기</a>
            </ButtonBox>
          </Form>
        </MainView>
      </LoginView>
    </Container>
  );
}
