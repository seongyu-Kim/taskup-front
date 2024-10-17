import { create } from 'zustand';
import { apiRequest } from '../../apis/authApi';
export interface UserState {
  user: { email: string; name: string } | null;
  isLoggedIn: boolean;
  login: (email: string, name: string) => void;
  logout: () => void;
  resetPassword: (email: string, newPassword: string) => void;
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
  logout: () => {
    set({ user: null, isLoggedIn: false });
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
  },
  resetPassword: (email, newPassword) => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      if (userData.email === email) {
        userData.password = newPassword;
        localStorage.setItem('userData', JSON.stringify(userData));
      }
    }
  },
  restoreLogin: () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUser = localStorage.getItem('user');
    if (isLoggedIn && storedUser) {
      set({ user: JSON.parse(storedUser), isLoggedIn: true });
    }
  },
  // 변경사항 저장으로 다시 수정
}));
