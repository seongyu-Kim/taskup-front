import { create } from 'zustand';
import { apiRequest } from '@apis/authApi';
export interface UserState {
  user: { email: string; name: string } | null;
  isLoggedIn: boolean;
  login: (email: string, name: string) => void;
  logout: () => void;
  restoreLogin: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoggedIn: false,

  login: (email: string, name: string) => {
    set({ user: { email, name }, isLoggedIn: true });
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify({ email, name }));
  },
  logout: async () => {
    try {
      await apiRequest('post', '/logout');
      console.log('로그아웃 성공');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
    set({ user: null, isLoggedIn: false });
  },
  restoreLogin: async () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');

    if (isLoggedIn && storedUser) {
      set({ user: storedUser, isLoggedIn: true });
    }
  },
}));
