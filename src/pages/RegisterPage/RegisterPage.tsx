import { useState } from 'react';
import {
  MainView,
  InputBox,
  Form,
  SubmitButton,
  ErrorText,
  ButtonBox,
  AuthButton,
} from './RegisterPage.styled';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
interface RegisterFormData {
  email: string;
  name: string;
  password: string;
  password_check: string;
  number: string;
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
  } = useForm<RegisterFormData>();

  // 이메일로 인증번호 전송 함수
  const sendVerificationCode = async (email: string) => {
    setErrorMessage(null);

    try {
      const response = await axios.post('/api/send-verification-code', { email });
      if (response.status === 200) {
        alert('인증번호가 이메일로 전송되었습니다.');
        setVerificationCode(response.data.code);
        setIsCodeSent(true);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 400) {
        setErrorMessage('이메일 전송 중 오류가 발생했습니다.');
      } else {
        setErrorMessage('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
    // const code = Math.floor(1000 + Math.random() * 9000).toString();
    // await sendEmail(email, code);
    // setSentCode(code);
    // setIsCodeSent(true);
    // alert(`인증번호가 ${email}로 전송되었습니다.`);
  };

  // 회원가입 처리 함수
  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    if (data.password !== data.password_check) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post('/users/sign-up', {
        email: data.email,
        name: data.name,
        password: data.password,
      });

      if (response.status === 201) {
        alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
        navigate('/login');
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 400) {
        setErrorMessage('이미 존재하는 이메일입니다.');
      } else {
        setErrorMessage('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsSubmitting(false);
    }

    // if (data.number !== sentCode) {
    //   alert('인증번호가 일치하지 않습니다.');
    //   return;
    // }

    // const userData = {
    //   email: data.email,
    //   name: data.name,
    //   password: data.password,
    // };
    // localStorage.setItem('userData', JSON.stringify(userData));

    // alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
    // navigate('/login');
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
            disabled={isCodeSent}
          />
        </InputBox>
        {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

        <AuthButton type="button" onClick={() => sendVerificationCode(watch('email'))}>
          인증번호 받기
        </AuthButton>

        <InputBox>
          <label htmlFor="number">인증번호</label>
          <input
            type="number"
            id="number"
            placeholder="인증번호를 입력하세요."
            {...register('number', { required: '인증번호를 입력해주세요.' })}
          />
          {errors.verificationCode && <ErrorText>{errors.verificationCode.message}</ErrorText>}
        </InputBox>

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
          {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
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
          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
        </InputBox>

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
          {errors.password_check && <ErrorText>{errors.password_check.message}</ErrorText>}
        </InputBox>

        <SubmitButton type="submit" disabled={isSubmitting}>
          회원가입 하기
        </SubmitButton>
      </Form>
      <ButtonBox>
        <Link to="/login">로그인 페이지로 돌아가기</Link>
      </ButtonBox>
    </MainView>
  );
}
