import { create } from 'zustand';
import { ModalStoreType } from './ModalStoreType';

const useModal = create<ModalStoreType>((set) => ({
  isOpen: false,
  setIsOpen: (value) => {
    set({ isOpen: value });
  },
}));
