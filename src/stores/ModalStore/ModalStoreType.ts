export interface ModalStoreType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export interface ModalStateType {
  modalState: '' | 'Profile' | 'Notice';
  setModalState: (modalState: '' | 'Profile' | 'Notice') => void;
}
