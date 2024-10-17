import ProfileModal from './ProfileModal/ProfileModal';
import { useModalState } from '@stores/ModalStore/ModalStore';
import NoticeModal from './NoticeModal/NoticeModal';

export default function ModalView() {
  const { modalState } = useModalState();
  if (modalState === 'Profile') {
    return <ProfileModal />;
  }
  if (modalState === 'Notice') {
    return <NoticeModal />;
  }
  return null;
}
