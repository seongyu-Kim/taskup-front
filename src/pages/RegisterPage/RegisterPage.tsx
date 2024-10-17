import { useState } from 'react';
import {
  MainView,
  InputBox,
  Form,
  SubmitButton,
  ButtonBox,
  AuthButton,
} from './RegisterPage.styled';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { UserPaths } from '../../routes/userPath';
import { apiRequest } from '../../apis/apiClient';
interface RegisterFormData {
  email: string;
  name: string;
  password: string;
  password_check: string;
  verificationCode: string;
}

export default function RegisterPage() {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm<RegisterFormData>({ mode: 'onChange' });

  // 이메일로 인증번호 전송 함수
  const sendVerificationCode = async (email: string) => {
    setErrorMessage(null);

    // API 호출
    const { data, error } = await apiRequest<{ code: string }, { email: string }>(
      'post',
      '/email-code ',
      { email },
    );

    if (error) {
      setErrorMessage('이메일 전송 중 오류가 발생했습니다.');
    } else if (data) {
      alert('인증번호가 이메일로 전송되었습니다.');
      setVerificationCode(data.code);
      setIsCodeSent(true);
    }
  };

  // 회원가입 처리 함수
  const onSubmit = async (formData: RegisterFormData) => {
    try {
      console.log('폼 제출 데이터:', formData);
      setIsSubmitting(true);
      setErrorMessage(null);

      const response = await apiRequest<
        null,
        { code: string; email: string; name: string; password: string }
      >('post', '/sign-up', {
        code: formData.verificationCode,
        email: formData.email,
        name: formData.name,
        password: formData.password,
      });

      // API 응답 처리
      if (response.error) {
        setErrorMessage(response.error);
        console.error('회원가입 에러:', response.error);
      } else {
        alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
        navigate(UserPaths.login);
      }
    } catch (error) {
      console.error('API 호출 중 오류:', error);
      setErrorMessage('회원가입 중 문제가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
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
            placeholder="이메일을 입력하세요."
            {...register('email', {
              required: true,
              pattern: {
                value: /^\S+@\S+$/i,
                message: '유효한 이메일 주소를 입력하세요.',
              },
            })}
            onBlur={() => trigger('email')}
            disabled={isCodeSent}
          />
        </InputBox>
        <ErrorMessage
          errors={errors}
          name="email"
          render={({ message }) => <p>{message}</p>}></ErrorMessage>

        <AuthButton type="button" onClick={() => sendVerificationCode(watch('email'))}>
          인증번호 받기
        </AuthButton>

        <InputBox>
          <label htmlFor="verificationCode">인증번호</label>
          <input
            type="text"
            id="verificationCode"
            placeholder="인증번호를 입력하세요."
            {...register('verificationCode', { required: '인증번호를 입력해주세요.' })}
          />
        </InputBox>
        <ErrorMessage
          errors={errors}
          name="verificationCode"
          render={({ message }) => <p>{message}</p>}></ErrorMessage>

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
        <ErrorMessage
          errors={errors}
          name="name"
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

        <InputBox>
          <label htmlFor="password_check">비밀번호 확인</label>
          <input
            type="password"
            id="password_check"
            placeholder="비밀번호를 다시 입력하세요."
            {...register('password_check', {
              required: '비밀번호 확인을 입력해주세요.',
              validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다.',
            })}
          />
        </InputBox>
        <ErrorMessage
          errors={errors}
          name="password_check"
          render={({ message }) => <p>{message}</p>}></ErrorMessage>

        <SubmitButton type="submit" disabled={isSubmitting}>
          회원가입 하기
        </SubmitButton>
      </Form>
      <ButtonBox>
        <Link to={UserPaths.login}>로그인 페이지로 돌아가기</Link>
      </ButtonBox>
    </MainView>
  );
}
