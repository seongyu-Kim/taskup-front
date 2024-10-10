import { create } from 'zustand';

export interface UserState {
  user: { email: string; name: string } | null;
  isLoggedIn: boolean;
  login: (email: string, name: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoggedIn: false,
  login: (email: string, name: string) => set({ user: { email, name }, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
}));
