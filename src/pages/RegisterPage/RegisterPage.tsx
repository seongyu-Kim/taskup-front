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
  password_check: string;
  number: string;
}

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = (data: RegisterFormData) => {
    console.log('회원가입 데이터:', data);
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
          <h1>회원가입</h1>
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
              <label htmlFor="name">이름</label>
              <input
                type="text"
                id="name"
                placeholder="이름을 입력하세요."
                {...register('name', {
                  required: '이름을 입력해주세요.',
                  maxLength: {
                    value: 10,
                    message: '이름은 최대 10자까지 입력 가능합니다.',
                  },
                })}
              />
            </InputBox>

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

            <InputBox>
              <label htmlFor="password_check">비밀번호</label>
              <input
                type="password"
                id="password_check"
                placeholder="비밀번호를 다시 입력하세요."
                {...register('password_check', {
                  required: '비밀번호 확인을 입력해주세요.',
                  validate: (value) =>
                    value === watch('password') || '비밀번호가 일치하지 않습니다.',
                })}
              />
            </InputBox>
            {errors.password_check && <ErrorText>{errors.password_check.message}</ErrorText>}

            <InputBox>
              <label htmlFor="number">인증번호</label>
              <input
                type="number"
                id="number"
                placeholder="인증번호를 입력하세요."
                {...register('number', {
                  required: '인증번호를 입력해주세요.',
                  minLength: {
                    value: 4,
                    message: '인증번호는 최소 4자 이상이어야 합니다.',
                  },
                })}
              />
            </InputBox>
            {errors.number && <ErrorText>{errors.number.message}</ErrorText>}

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
