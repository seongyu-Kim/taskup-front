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
import { useForm } from 'react-hook-form';
interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    console.log('로그인 데이터:', data);
  };
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
          <h1>로그인</h1>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputBox>
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                placeholder="이메일을 입력하세요."
                {...register('email', {
                  required: '이메일을 입력해주세요.',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: '유효한 이메일 주소를 입력하세요.',
                  },
                })}
              />
            </InputBox>
            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

            <InputBox>
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                placeholder="비밀번호를 입력하세요."
                {...register('password', {
                  required: '비밀번호를 입력해주세요.',
                  minLength: {
                    value: 6,
                    message: '비밀번호는 최소 6자 이상이어야 합니다.',
                  },
                })}
              />
            </InputBox>
            {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

            <SubmitButton type="submit">로그인 하기</SubmitButton>
            <ButtonBox>
              <Link to={'/register'}>회원가입</Link>
              <Link to={'/password-reset'}>비밀번호 찾기</Link>
            </ButtonBox>
          </Form>
        </MainView>
      </LoginView>
    </Container>
  );
}
