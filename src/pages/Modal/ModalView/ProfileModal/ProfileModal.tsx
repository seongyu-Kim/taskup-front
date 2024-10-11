import { useRef } from 'react';
import { useModal, useModalState } from '../../../../stores/ModalStore/ModalStore';
import { FaCamera } from 'react-icons/fa';
import { RiCloseLargeFill } from 'react-icons/ri';
import {
  ProfileImg,
  ProfileModalBodyBox,
  ProfileModalBox,
  ProfileModalContainer,
  ProfileModalHeaderBox,
  ProfileLogOutButton,
  ProfileModalMainBox,
  ProfileNameText,
  ProfileCompleteButton,
  ProfileModalImgBox,
  ProfileImgChangeCameraIcon,
} from './ProfileModal.styled';
import { handleModalCloseClick } from '../../../../utils/HandleModalCloseClick';
import tempPhoto from '../../../../assets/임시 프로필사진.png';
import { handleFileSelectorClick } from '../../../../utils/HandleFileSelectorClick';
import { useUserStore } from '../../../../stores/UserStore/userStore';
import { useNavigate } from 'react-router-dom';

export default function ProfileModal() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isOpen, setIsOpen } = useModal();
  const { setModalState } = useModalState();

  // 로그아웃 기능 구현
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    alert('로그아웃되었습니다.');
    navigate('/login');
  };
  return isOpen ? (
    <>
      <ProfileModalContainer onClick={() => setIsOpen(false)}>
        <RiCloseLargeFill className="closeIcon" />
        <ProfileModalBox onClick={handleModalCloseClick}>
          <ProfileModalHeaderBox>
            <p>프로필</p>
            <ProfileCompleteButton
              onClick={() => {
                setIsOpen(false);
                setModalState('');
              }}>
              완료
            </ProfileCompleteButton>
          </ProfileModalHeaderBox>
          <ProfileModalBodyBox>
            <ProfileModalImgBox>
              <ProfileImg
                id={'profile_img'}
                src={tempPhoto}
                onClick={() => handleFileSelectorClick(fileInputRef)}
                alt={'프로필 사진'}
              />
              <ProfileImgChangeCameraIcon className="icons" />
            </ProfileModalImgBox>
            <FaCamera className="camera" />
            <input type={'file'} ref={fileInputRef} hidden={true} />
            <ProfileModalMainBox>
              <ProfileNameText>이름</ProfileNameText>
              <ProfileLogOutButton
                onClick={() => {
                  setIsOpen(false);
                  setModalState('');
                  handleLogout();
                }}>
                로그아웃
              </ProfileLogOutButton>
            </ProfileModalMainBox>
          </ProfileModalBodyBox>
        </ProfileModalBox>
      </ProfileModalContainer>
    </>
  ) : null;
}
