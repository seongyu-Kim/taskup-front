import { create } from 'zustand';
import { ModalStateType, ModalStoreType } from './ModalStoreType';

//모달 ON OFF
export const useModal = create<ModalStoreType>((set) => ({
  isOpen: false,
  setIsOpen: (value) => {
    set({ isOpen: value });
  },
}));

export const useModalState = create<ModalStateType>((set) => ({
  modalState: '',
  setModalState: (value) => {
    set({ modalState: value });
  },
}));
