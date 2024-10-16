import { useState } from 'react';
import { MainView, InputBox, Form, SubmitButton, ButtonBox } from './LoginPage.styled';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useUserStore, UserState } from '../../stores/UserStore/userStore';
import { ErrorMessage } from '@hookform/error-message';
import { UserPaths } from '../../routes/userPath';
import { apiRequest } from '../../apis/apiClient';
interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<LoginFormData>({ mode: 'onChange' });
  const navigate = useNavigate();
  const login = useUserStore((state: UserState) => state.login);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    // API 호출
    const { data: responseData, error } = await apiRequest<{
      email: string;
      name: string;
    }>('post', '/sign-in', { email: data.email, password: data.password });

    if (error) {
      setErrorMessage(error);
      console.error('로그인 에러:', error);
    } else if (responseData) {
      const { email, name } = responseData;
      login(email, name, true);
      navigate(UserPaths.main);
    }

    setIsSubmitting(false);
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
            onBlur={() => trigger('email')}
          />
        </InputBox>
        <ErrorMessage
          errors={errors}
          name="email"
          render={({ message }) => <p>{message}</p>}></ErrorMessage>

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
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => <p>{message}</p>}></ErrorMessage>

        <SubmitButton type="submit">로그인 하기</SubmitButton>
        <ButtonBox>
          <Link to={UserPaths.register}>회원가입</Link>
          <Link to={UserPaths.passwordReset}>비밀번호 찾기</Link>
        </ButtonBox>
      </Form>
    </MainView>
  );
}
