import { useRef, useState } from 'react';
import { useModal, useModalState } from '@stores/ModalStore/ModalStore';
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
import { handleModalCloseClick } from '@utils/HandleModalCloseClick';
import { handleFileSelectorClick } from '@utils/HandleFileSelectorClick';
import { useUserStore } from '@stores/UserStore/userStore';
import { useNavigate } from 'react-router-dom';
import { useProfileImgStore } from '@stores/ProfileImgStore/ProfileImgStore';

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
  const { imageUrl, setImageUrl } = useProfileImgStore();
  const [saveState, setSaveState] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tempImgUrl, setTempImgUrl] = useState<string | null>(localStorage.getItem('profileImage'));
  const localImg = localStorage.getItem('profileImg');

  //로컬 스토리지에서 유저 데이터 가져오기
  const userData = localStorage.getItem('userData');
  const { name }: { email: string; name: string } = JSON.parse(userData!);

  const handleImageSave = () => {
    if (!tempImgUrl && selectedFile === null) {
      alert('파일을 선택해 주세요');
      return;
    }
    if (saveState) {
      setImageUrl(tempImgUrl!);
      localStorage.setItem('profileImage', tempImgUrl!);
      setSaveState(false);
    }
  };

  // 이미지 변경
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size >= 2000000) {
      alert('크기가 2MB 이상인 파일은 올릴 수 없습니다.');
      return;
    }
    if (file) {
      const reader = new FileReader();
      setSelectedFile(file);
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setTempImgUrl(base64Image);
        localStorage.setItem('profileImage', base64Image);
      };
      reader.readAsDataURL(file);
    }
  };
  //모달 배경 클릭
  const handleModalOutsideClick = () => {
    setIsOpen(false);
    setSaveState(!saveState);
    setTempImgUrl(localImg);
  };
  //완료 버튼 클릭
  const handleCompleteButtonClick = () => {
    setIsOpen(false);
    setModalState('');
    setSaveState(true);
    handleImageSave();
    const savedImageUrl = localStorage.getItem('profileImage');
    if (savedImageUrl) setImageUrl(savedImageUrl);
  };
  //이미지 선택 클릭
  const handleImageChangeClick = () => {
    handleFileSelectorClick(fileInputRef);
    setSaveState(!saveState);
  };
  //로그아웃
  const handleLogoutClick = () => {
    setIsOpen(false);
    setModalState('');
    handleLogout();
  };

  if (!isOpen) {
    return null;
  }
  return (
    <>
      <ProfileModalContainer onClick={handleModalOutsideClick}>
        <RiCloseLargeFill className="closeIcon" />
        <ProfileModalBox
          onClick={(e) => {
            handleModalCloseClick(e);
          }}>
          <ProfileModalHeaderBox>
            <p>프로필</p>
            <ProfileCompleteButton onClick={handleCompleteButtonClick}>완료</ProfileCompleteButton>
          </ProfileModalHeaderBox>
          <ProfileModalBodyBox>
            <ProfileModalImgBox>
              <ProfileImg
                id="profile_img"
                src={tempImgUrl === null ? (localImg === null ? imageUrl : null)! : tempImgUrl}
                onClick={handleImageChangeClick}
                alt={'프로필 사진'}
              />
              <ProfileImgChangeCameraIcon className="icons" />
            </ProfileModalImgBox>
            <FaCamera className="camera" />
            <input
              type="file"
              accept="image/jpeg, image/png"
              ref={fileInputRef}
              hidden={true}
              onChange={(e) => handleImageChange(e)}
            />
            <ProfileModalMainBox>
              <ProfileNameText>{name}</ProfileNameText>
              <ProfileLogOutButton onClick={handleLogoutClick}>로그아웃</ProfileLogOutButton>
            </ProfileModalMainBox>
          </ProfileModalBodyBox>
        </ProfileModalBox>
      </ProfileModalContainer>
    </>
  );
}
