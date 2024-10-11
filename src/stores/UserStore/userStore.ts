import { create } from 'zustand';

export interface UserState {
  user: { email: string; name: string } | null;
  isLoggedIn: boolean;
  login: (email: string, name: string) => void;
  logout: () => void;
  resetPassword: (email: string, newPassword: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoggedIn: false,
  login: (email: string, name: string) => set({ user: { email, name }, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
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
}));
