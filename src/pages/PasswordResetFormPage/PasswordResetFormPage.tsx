import React from 'react';
import {
  Container,
  PasswordResetView,
  MainView,
  InputBox,
  Form,
  SubmitButton,
  ErrorText,
  LinkBox,
  Sidebar,
} from './PasswordResetFormPage.styled';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

interface PasswordResetFormData {
  email: string;
}

export default function PasswordResetPage() {
  const {
    register,
    formState: { errors },
  } = useForm<PasswordResetFormData>();

  return (
    <Container>
      <PasswordResetView>
        <Sidebar>
          <img src="./logo_color.png" alt="TaskUp logo" />
        </Sidebar>
        <MainView>
          <h1>비밀번호 찾기</h1>
          <p>가입된 이메일을 입력하시면 비밀번호 재설정 링크를 보내드립니다.</p>
          <Form>
            <InputBox>
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                placeholder="이메일을 입력하세요."
                {...register('email', {
                  required: '이메일을 입력해주세요.',
                  pattern: /^\S+@\S+$/i,
                })}
              />
            </InputBox>
            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
            <SubmitButton type="submit">재설정 링크 보내기</SubmitButton>
          </Form>
          <LinkBox>
            <Link to="/login">로그인으로 돌아가기</Link>
            <Link to="/register">계정이 없으신가요? 회원가입</Link>
          </LinkBox>
        </MainView>
      </PasswordResetView>
    </Container>
  );
}
