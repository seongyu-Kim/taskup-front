import { useState } from 'react';
import { MainView, InputBox, Form, SubmitButton, ButtonBox } from './PasswordResetFormPage.styled';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { sendResetLink } from '../../utils/emailService';
import { ErrorMessage } from '@hookform/error-message';

interface PasswordResetFormData {
  email: string;
}

export default function PasswordResetPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<PasswordResetFormData>({ mode: 'onChange' });
  const [isEmailSent, setIsEmailSent] = useState(false);
  const navigate = useNavigate();

  const generateResetToken = () => {
    return Math.random().toString(36).substring(2, 10);
  };

  const onSubmit = async (data: PasswordResetFormData) => {
    const token = generateResetToken();
    const resetLink = `http://localhost:3000/password-reset/confirm?email=${encodeURIComponent(data.email)}&token=${encodeURIComponent(token)}`;
    localStorage.setItem(`resetToken-${data.email}`, token);

    console.log('Generated Reset Link:', resetLink);

    try {
      await sendResetLink(data.email, resetLink);
      alert(`비밀번호 재설정 링크가 이메일로 전송되었습니다`);
      navigate(
        `/password-reset/confirm?email=${encodeURIComponent(data.email)}&token=${encodeURIComponent(token)}`,
      );
    } catch (error) {
      alert(`이메일 전송 중 오류가 발생했습니다. 다시 시도해주세요.: ${error}`);
    }
  };

  return (
    <MainView>
      <h1>비밀번호 찾기</h1>
      <p>가입된 이메일을 입력하시면 비밀번호 재설정 링크를 보내드립니다.</p>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputBox>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            placeholder="이메일을 입력하세요."
            {...register('email', {
              required: '이메일을 입력해주세요.',
              pattern: /^\S+@\S+$/i,
            })}
            onBlur={() => trigger('email')}
          />
        </InputBox>
        <ErrorMessage
          errors={errors}
          name="email"
          render={({ message }) => <p>{message}</p>}></ErrorMessage>
        <SubmitButton type="submit">재설정 링크 보내기</SubmitButton>
      </Form>
      {isEmailSent && <p>링크가 전송되었습니다. 이메일을 확인하세요!</p>}
      <ButtonBox>
        <Link to="/login">로그인으로 돌아가기</Link>
        <Link to="/register">계정이 없으신가요? 회원가입</Link>
      </ButtonBox>
    </MainView>
  );
}
