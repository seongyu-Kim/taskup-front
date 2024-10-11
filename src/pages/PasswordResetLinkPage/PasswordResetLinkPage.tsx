import React from 'react';
import {
  Container,
  ResetLinkView,
  MainView,
  InputBox,
  Form,
  SubmitButton,
  ErrorText,
  SuccessText,
} from './PasswordResetLinkPage.styled';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

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
  } = useForm<PasswordResetFormData>();

  const [resetSuccess, setResetSuccess] = useState(false);

  const onSubmit = (data: PasswordResetFormData) => {
    if (data.newPassword !== data.confirmPassword) {
      return;
    }
    setResetSuccess(true);
  };

  return (
    <Container>
      <ResetLinkView>
        <MainView>
          <h1>비밀번호 재설정</h1>
          {!resetSuccess ? (
            <>
              <p>새로운 비밀번호를 설정하세요.</p>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <InputBox>
                  <label htmlFor="newPassword">새 비밀번호</label>
                  <input
                    type="password"
                    id="newPassword"
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
                {errors.newPassword && <ErrorText>{errors.newPassword.message}</ErrorText>}

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
                {errors.confirmPassword && <ErrorText>{errors.confirmPassword.message}</ErrorText>}

                <SubmitButton type="submit">비밀번호 재설정</SubmitButton>
              </Form>
            </>
          ) : (
            <SuccessText>
              비밀번호가 성공적으로 재설정되었습니다. <br />
              <a href="/login">로그인 페이지로 이동하기</a>
            </SuccessText>
          )}
        </MainView>
      </ResetLinkView>
    </Container>
  );
}
