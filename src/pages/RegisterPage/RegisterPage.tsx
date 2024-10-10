import {
  Container,
  Sidebar,
  MainView,
  LoginView,
  InputBox,
  Form,
  SubmitButton,
  ErrorText,
  ButtonBox,
} from './RegisterPage.styled';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
interface RegisterFormData {
  email: string;
  name: string;
  password: string;
}

export default function RegisterPage() {
  const {
    register,
    formState: { errors },
  } = useForm<RegisterFormData>();
  return (
    <Container>
      <LoginView>
        <Sidebar>
          <img src="./logo_color.png" alt="TaskUp logo" />
        </Sidebar>
        <MainView>
          <h3>
            <span>TaskUp</span>과 함께하게 되신 걸 환영합니다.
          </h3>
          <h1>회원가입</h1>
          <Form action="">
            <InputBox>
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                placeholder="이메일을 입력하세요."
                {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
              />
            </InputBox>
            {errors.email && <ErrorText>이미 존재하는 이메일 입니다.</ErrorText>}

            <InputBox>
              <label htmlFor="name">이름</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="이름을 입력하세요."
                maxLength={10}
              />
            </InputBox>

            <InputBox>
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                name="password"
                id="password"
                minLength={6}
                placeholder="비밀번호를 입력하세요."
              />
            </InputBox>

            <InputBox>
              <label htmlFor="password_check">비밀번호</label>
              <input
                type="password"
                name="password_check"
                id="password_check"
                minLength={6}
                placeholder="비밀번호를 다시 입력하세요."
              />
            </InputBox>
            <ErrorText>비밀번호가 일치하지 않습니다.</ErrorText>

            <InputBox>
              <label htmlFor="number">인증번호</label>
              <input type="number" name="number" id="number" placeholder="인증번호를 입력하세요." />
            </InputBox>
            <ErrorText>인증번호가 일치하지 않습니다.</ErrorText>

            <SubmitButton type="submit">회원가입 하기</SubmitButton>
          </Form>
          <ButtonBox>
            <Link to="/login">로그인 페이지로 돌아가기</Link>
          </ButtonBox>
        </MainView>
      </LoginView>
    </Container>
  );
}
