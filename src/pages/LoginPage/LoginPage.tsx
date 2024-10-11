import { MainView, InputBox, Form, SubmitButton, ButtonBox, ErrorText } from './LoginPage.styled';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useUserStore, UserState } from '../../stores/UserStore/userStore';
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
  const navigate = useNavigate();
  const login = useUserStore((state: UserState) => state.login);

  const getUserData = () => {
    const storeUserData = localStorage.getItem('userData');
    return storeUserData ? JSON.parse(storeUserData) : null;
  };

  const onSubmit = (data: LoginFormData) => {
    const userData = getUserData();

    if (!userData) {
      alert('회원 정보가 존재하지 않습니다. 회원가입을 먼저 진행해주세요.');
      return;
    }

    if (data.email === userData.email && data.password === userData.password) {
      login(userData.email, userData.name);
      navigate('/main');
    } else {
      alert('이메일 또는 비밀번호가 일치하지 않습니다.');
    }
  };
  return (
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
  );
}
