import axios, { AxiosError } from 'axios';

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

const apiClient = axios.create({
  baseURL: 'http://kdt-react-node-1-team03.elicecoding.com:5000/user',
  timeout: 10000,
});

// 타입 가드 함수: `message` 속성이 있는지 확인
function hasMessage(obj: unknown): obj is { message: string } {
  return (
    typeof obj === 'object' && obj !== null && 'message' in obj && typeof obj.message === 'string'
  );
}

// 공통 API 요청 함수
export async function apiRequest<T, D = unknown>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: D,
): Promise<ApiResponse<T>> {
  try {
    const response = await apiClient({
      method,
      url,
      data,
    });

    return { data: response.data, error: null };
  } catch (error) {
    const axiosError = error as AxiosError;

    // 응답 데이터에서 message 추출, 없을 경우 기본 메시지 사용
    let message = '요청 중 오류가 발생했습니다.';
    if (axiosError.response && hasMessage(axiosError.response.data)) {
      message = axiosError.response.data.message;
    }

    return { data: null, error: message };
  }
}
