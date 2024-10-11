export const sendEmail = (email: string, code: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`이메일 전송됨: ${email}, 인증코드: ${code}`);
      resolve(true);
    }, 1000);
  });
};

export const sendResetLink = (email: string, resetLink: string) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log(`비밀번호 재설정 링크가 ${email}로 전송되었습니다. ${resetLink}`);
      resolve();
    }, 1000);
  });
};
