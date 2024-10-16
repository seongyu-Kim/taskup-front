import { create } from 'zustand';
import { apiRequest } from '../../apis/apiClient';
export interface UserState {
  user: { email: string; name: string } | null;
  isLoggedIn: boolean;
  login: (email: string, name: string, rememberMe: boolean) => void;
  logout: () => void;
  restoreLogin: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoggedIn: false,

  login: (email: string, name: string, rememberMe = false) => {
    set({ user: { email, name }, isLoggedIn: true });
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('isLoggedIn', 'true');
    storage.setItem('user', JSON.stringify({ email, name }));
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

    if (isLoggedIn && storedUser) {
      set({ user: storedUser, isLoggedIn: true });
    }
  },
}));
