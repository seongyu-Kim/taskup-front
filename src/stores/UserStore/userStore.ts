import { Token } from './../../../node_modules/postcss-load-config/node_modules/yaml/dist/parse/cst.d';
import { create } from 'zustand';
import { apiRequest } from '@apis/authApi';
export interface UserState {
  user: { email: string; name: string } | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (email: string, name: string, token: string) => void;
  logout: () => void;
  restoreLogin: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  token: null,
  isLoggedIn: false,

  login: (email: string, name: string, token: string) => {
    set({ user: { email, name }, token, isLoggedIn: true });
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify({ email, name }));
    localStorage.setItem('token', token);
  },
  logout: async () => {
    try {
      await apiRequest('post', '/logout');
      console.log('로그아웃 성공');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
    set({ user: null, isLoggedIn: false });
  },
  restoreLogin: async () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    const token = localStorage.getItem('token');

    if (isLoggedIn && storedUser && token) {
      set({ user: storedUser, token, isLoggedIn: true });
    }
  },
}));
