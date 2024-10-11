export const sendEmail = (email: string, code: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`이메일 전송됨: ${email}, 인증코드: ${code}`);
      resolve(true);
    }, 1000);
  });
};
