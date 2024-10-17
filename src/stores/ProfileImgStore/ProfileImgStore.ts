import { create } from 'zustand';
import { ProfileImgStoreType, SaveState } from './ProfileImgStoreType';
import defaultProfileImg from '../../assets/임시 프로필사진.png';

export const useProfileImgStore = create<ProfileImgStoreType>((set) => ({
  imageUrl: defaultProfileImg,
  setImageUrl: (url) => {
    set({ imageUrl: url });
  },
}));
export const useSaveState = create<SaveState>((set) => ({
  saveState: true,
  setSaveState: (state) => {
    set({ saveState: state });
  },
}));
