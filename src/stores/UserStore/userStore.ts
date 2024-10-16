import { create } from 'zustand';
import { apiRequest } from '../../apis/apiClient';
export interface UserState {
  user: { email: string; name: string } | null;
  isLoggedIn: boolean;
  token: string | null;
  login: (email: string, name: string, token: string, rememberMe: boolean) => void;
  logout: () => void;
  restoreLogin: () => void;
  validateToken: (token: string) => Promise<boolean>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoggedIn: false,
  token: null,

  login: (email: string, name: string, token, rememberMe = false) => {
    set({ user: { email, name }, isLoggedIn: true });
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('isLoggedIn', 'true');
    storage.setItem('user', JSON.stringify({ email, name }));
    storage.setItem('token', token);
  },
  logout: async () => {
    try {
      await apiRequest('post', '/logout');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
    set({ user: null, isLoggedIn: false });
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('user');
  },
  restoreLogin: async () => {
    const isLoggedIn =
      localStorage.getItem('isLoggedIn') === 'true' ||
      sessionStorage.getItem('isLoggedIn') === 'true';

    const storedUser =
      JSON.parse(localStorage.getItem('user') || 'null') ||
      JSON.parse(sessionStorage.getItem('user') || 'null');

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (isLoggedIn && storedUser && token) {
      // 토큰 유효성 검증
      const isValidToken = await useUserStore.getState().validateToken(token);
      if (isValidToken) {
        set({ user: storedUser, isLoggedIn: true, token });
      } else {
        set({ user: null, isLoggedIn: false, token: null });
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
      }
    }
  },

  // 토큰 유효성 검증 함수: 백엔드에 토큰 유효성 확인 요청
  validateToken: async (token: string) => {
    const { data, error } = await apiRequest('post', '/validate-token', { token });
    if (error || !data) {
      return false; // 토큰이 유효하지 않으면 false 반환
    }
    return true; // 유효한 토큰일 경우 true 반환
  },
}));
