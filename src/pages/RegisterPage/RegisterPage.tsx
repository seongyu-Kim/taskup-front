import {
  Container,
  Sidebar,
  MainView,
  LoginView,
  InputBox,
  Form,
  SubmitButton,
} from './RegisterPage.styled';

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
              <label htmlFor="id">아이디</label>
              <input type="text" name="id" id="id" placeholder="아이디를 입력하세요." />
              <p>이미 존재하는 아이디입니다.</p>
            </InputBox>

            <InputBox>
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                name="password"
                id="password"
                maxLength={10}
                placeholder="비밀번호를 입력하세요."
              />
              <p></p>
            </InputBox>

            <InputBox>
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                name="password"
                id="password"
                maxLength={10}
                placeholder="비밀번호를 다시 입력하세요."
              />
              <p>비밀번호가 일치하지 않습니다.</p>
            </InputBox>

            <InputBox>
              <label htmlFor="email">이메일</label>
              <input type="email" name="email" id="email" placeholder="이메일을 입력하세요." />
            </InputBox>

            <InputBox>
              <label htmlFor="number">인증번호</label>
              <input type="number" name="number" id="number" placeholder="인증번호를 입력하세요." />
              <p>인증번호가 일치하지 않습니다.</p>
            </InputBox>

            <SubmitButton type="submit">회원가입 하기</SubmitButton>
          </Form>
        </MainView>
      </LoginView>
    </Container>
  );
}
