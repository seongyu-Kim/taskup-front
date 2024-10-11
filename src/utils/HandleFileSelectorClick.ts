export const handleFileSelectorClick = (inputRef: React.RefObject<HTMLInputElement>) => {
  if (inputRef.current) {
    inputRef.current.click(); // 숨겨진 파일 입력 클릭
  }
};
