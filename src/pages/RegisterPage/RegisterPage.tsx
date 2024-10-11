import React, { useState } from 'react';
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
  AuthButton,
} from './RegisterPage.styled';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { sendEmail } from '../../utils/emailService';
interface RegisterFormData {
  email: string;
  name: string;
  password: string;
  password_check: string;
  number: string;
}

export default function RegisterPage() {
  const [sentCode, setSentCode] = useState<string | null>(null);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  // 이메일로 인증번호 전송 함수
  const sendVerificationCode = async (email: string) => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    await sendEmail(email, code);
    setSentCode(code);
    setIsCodeSent(true);
    alert(`인증번호가 ${email}로 전송되었습니다.`);
  };

  // 회원가입 처리 함수
  const onSubmit = (data: RegisterFormData) => {
    if (data.number !== sentCode) {
      alert('인증번호가 일치하지 않습니다.');
      return;
    }

    const userData = {
      email: data.email,
      name: data.name,
      password: data.password,
    };
    localStorage.setItem('userData', JSON.stringify(userData));

    alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
    navigate('/login');
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

            <AuthButton
              type="button"
              onClick={() => sendVerificationCode(watch('email'))}
              disabled={isCodeSent}>
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
              {errors.number && <ErrorText>{errors.number.message}</ErrorText>}
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
                  validate: (value) =>
                    value === watch('password') || '비밀번호가 일치하지 않습니다.',
                })}
              />
              {errors.password_check && <ErrorText>{errors.password_check.message}</ErrorText>}
            </InputBox>

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
