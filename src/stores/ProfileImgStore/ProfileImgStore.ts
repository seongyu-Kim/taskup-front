import { create } from 'zustand';
import { ProfileImgStoreType } from './ProfileImgStoreType';

export const useProfileImgStore = create<ProfileImgStoreType>((set) => ({
  imageUrl: '',
  setImageUrl: (url) => {
    set({ imageUrl: url });
  },
}));
