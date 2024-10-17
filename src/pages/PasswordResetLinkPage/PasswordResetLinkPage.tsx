import { MainView, InputBox, Form, SubmitButton } from './PasswordResetLinkPage.styled';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import { UserPaths } from '../../routes/userPath';
import { apiRequest } from '../../apis/authApi';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 쿼리 파라미터에서 email과 token 값 추출
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');
  const token = queryParams.get('token');

  const onSubmit = async (data: PasswordResetFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    // API 호출
    const { error } = await apiRequest('post', '/password-reset/confirm', {
      email,
      token,
      password: data.newPassword,
      confirmPassword: data.confirmPassword,
    });

    if (error) {
      setErrorMessage(error);
    } else {
      setIsSuccess(true);
      alert('비밀번호가 성공적으로 변경되었습니다.');

      navigate(UserPaths.login);
    }

    setIsSubmitting(false);
  };

  return (
    <MainView>
      <h1>비밀번호 재설정</h1>
      {isSuccess ? (
        <p>비밀번호가 성공적으로 변경되었습니다!</p>
      ) : (
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
      )}
    </MainView>
  );
}
