import { MainView, InputBox, Form, SubmitButton } from './PasswordResetLinkPage.styled';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUserStore } from '../../stores/UserStore/userStore';
import { ErrorMessage } from '@hookform/error-message';
import { UserPaths } from '../../routes/userPath';
interface PasswordResetFormData {
  newPassword: string;
  confirmPassword: string;
}

export default function PasswordResetLinkPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordResetFormData>({ mode: 'onChange' });
  const [resetSuccess, setResetSuccess] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const resetPassword = useUserStore((state) => state.resetPassword);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = decodeURIComponent(searchParams.get('email') || '');
  const token = decodeURIComponent(searchParams.get('token') || '');

  useEffect(() => {
    console.log('URL Email:', email);
    console.log('URL Token:', token);
    if (!email || !token) {
      alert('유효하지 않은 접근입니다.');
      navigate(UserPaths.login);
      return;
    }

    const storedToken = localStorage.getItem(`resetToken-${email}`);
    if (storedToken === token) {
      setIsTokenValid(true);
    } else {
      alert('유효하지 않은 링크입니다.');
      navigate(UserPaths.login);
    }
  }, [email, token, navigate]);

  const onSubmit = (data: PasswordResetFormData) => {
    if (!isTokenValid) {
      alert('유효하지 않은 접근입니다.');
      return;
    }

    if (data.newPassword !== data.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    resetPassword(email!, data.newPassword);
    setResetSuccess(true);
    alert('비밀번호가 성공적으로 변경되었습니다. 로그인 페이지로 이동합니다.');
    navigate(UserPaths.login);
  };

  return (
    <MainView>
      <h1>비밀번호 재설정</h1>
      {isTokenValid ? (
        <>
          <p>새로운 비밀번호를 설정하세요.</p>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputBox>
              <label htmlFor="newPassword">새 비밀번호</label>
              <input
                type="password"
                placeholder="새 비밀번호를 입력하세요."
                {...register('newPassword', {
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
              name="newPassword"
              render={({ message }) => <p>{message}</p>}></ErrorMessage>

            <InputBox>
              <label htmlFor="confirmPassword">비밀번호 확인</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="비밀번호를 다시 입력하세요."
                {...register('confirmPassword', {
                  required: '비밀번호를 다시 입력해주세요.',
                  validate: (value) =>
                    value === watch('newPassword') || '비밀번호가 일치하지 않습니다.',
                })}
              />
            </InputBox>
            <ErrorMessage
              errors={errors}
              name="confirmPassword"
              render={({ message }) => <p>{message}</p>}></ErrorMessage>

            <SubmitButton type="submit">비밀번호 재설정</SubmitButton>
          </Form>
        </>
      ) : (
        <p>유효하지 않은 링크입니다.</p>
      )}
      {resetSuccess && <p>비밀번호가 성공적으로 변경되었습니다!</p>}
    </MainView>
  );
}
