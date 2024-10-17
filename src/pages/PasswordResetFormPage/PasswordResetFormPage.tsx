import { useState } from 'react';
import { MainView, InputBox, Form, SubmitButton, ButtonBox } from './PasswordResetFormPage.styled';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import { UserPaths } from '../../routes/userPath';
import { apiRequest } from '../../apis/authApi';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: PasswordResetFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    const { error } = await apiRequest('post', '/password-reset', {
      email: data.email,
    });

    if (error) {
      setErrorMessage(error);
    } else {
      setIsEmailSent(true);
      alert('비밀번호 재설정 링크가 이메일로 전송되었습니다.');
    }

    setIsSubmitting(false);
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
        <Link to={UserPaths.login}>로그인으로 돌아가기</Link>
        <Link to={UserPaths.register}>계정이 없으신가요? 회원가입</Link>
      </ButtonBox>
    </MainView>
  );
}
