import ProfileModal from './ProfileModal/ProfileModal';
import { useModalState } from '../../../stores/ModalStore/ModalStore';
import NoticeModal from './NoticeModal/NoticeModal';

export default function ModalView() {
  const { modalState } = useModalState();
  return modalState === 'Profile' ? (
    <>
      <ProfileModal />
    </>
  ) : modalState === 'Notice' ? (
    <>
      <NoticeModal />
    </>
  ) : null;
}
