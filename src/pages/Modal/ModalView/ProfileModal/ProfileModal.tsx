import { useRef, useState } from 'react';
import { useModal, useModalState } from '@stores/ModalStore/ModalStore';
import { FaCamera } from 'react-icons/fa';
import { RiCloseLargeFill } from 'react-icons/ri';
import * as Styled from './ProfileModal.styled';
import { handleModalCloseClick } from '@utils/HandleModalCloseClick';
import { handleFileSelectorClick } from '@utils/HandleFileSelectorClick';
import { useUserStore } from '@stores/UserStore/userStore';
import { useNavigate } from 'react-router-dom';
import { useProfileImgStore } from '@stores/ProfileImgStore/ProfileImgStore';
import MainPageDefaultButton from '@components/MainPageDefaultButton/MainPageDefaultButton';
import apiMainPage from '@apis/apiMainPage';

export default function ProfileModal() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tempImgUrl, setTempImgUrl] = useState<string | null>('');
  const { isOpen, setIsOpen } = useModal();
  const { setModalState } = useModalState();
  const { imageUrl, setImageUrl } = useProfileImgStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();
  const { user } = useUserStore();

  // 로그아웃 기능 구현
  const handleLogout = () => {
    logout();
    alert('로그아웃되었습니다.');
    navigate('/login');
  };
  //이미지 저장
  const handleImageSave = () => {
    if (!tempImgUrl && selectedFile === null) {
      alert('파일을 선택해 주세요');
      return;
    }
    setImageUrl(tempImgUrl!);
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
      };
      reader.readAsDataURL(file);
    }
  };
  //바깥 영역 클릭
  const handleModalOutsideClick = () => {
    setIsOpen(false);
    setTempImgUrl('');
    setSelectedFile(null);
  };
  //완료 버튼 클릭
  const handleCompleteButtonClick = () => {
    const userImage = async () => {
      if (!selectedFile) {
        return;
      }

      const formData = new FormData();
      formData.append('profileImage', selectedFile);

      try {
        await apiMainPage.patch(`/user/profile`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } catch (error) {
        console.log(error);
      }
    };
    setIsOpen(false);
    setModalState('');
    handleImageSave();
    userImage().catch(console.error);
  };
  //이미지 변경 클릭
  const handleImageChangeClick = () => {
    handleFileSelectorClick(fileInputRef);
  };
  //로그아웃 버튼 클릭
  const handleLogoutClick = () => {
    setIsOpen(false);
    setModalState('');
    handleLogout();
    setTempImgUrl('');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <Styled.ProfileModalContainer onClick={handleModalOutsideClick}>
        <RiCloseLargeFill className="closeIcon" />
        <Styled.ProfileModalBox onClick={(e) => handleModalCloseClick(e)}>
          <Styled.ProfileModalHeaderBox>
            <p>프로필</p>
            <MainPageDefaultButton
              onClick={handleCompleteButtonClick}
              position="absolute"
              right="10px"
              width="50px">
              완료
            </MainPageDefaultButton>
          </Styled.ProfileModalHeaderBox>
          <Styled.ProfileModalBodyBox>
            <Styled.ProfileModalImgBox>
              <Styled.ProfileImg
                id="profile_img"
                src={tempImgUrl || imageUrl}
                onClick={handleImageChangeClick}
                alt="프로필 사진"
              />
              <Styled.ProfileImgChangeCameraIcon className="icons" />
            </Styled.ProfileModalImgBox>
            <FaCamera className="camera" />
            <input
              type="file"
              accept="image/jpeg, image/png"
              ref={fileInputRef}
              hidden
              onChange={handleImageChange}
            />
            <Styled.ProfileModalMainBox>
              <Styled.ProfileNameText>{user!.name}</Styled.ProfileNameText>
              <MainPageDefaultButton onClick={handleLogoutClick} backgroundColor="red" width="100%">
                로그아웃
              </MainPageDefaultButton>
            </Styled.ProfileModalMainBox>
          </Styled.ProfileModalBodyBox>
        </Styled.ProfileModalBox>
      </Styled.ProfileModalContainer>
    </>
  );
}
