import { useEffect, useRef, useState } from 'react';
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
import tempImg from '../../../../assets/임시 프로필사진.png';
import { handleModalCloseClick } from '../../../../utils/HandleModalCloseClick';
import { handleFileSelectorClick } from '../../../../utils/HandleFileSelectorClick';
import { useNavigate } from 'react-router-dom';
import { useProfileImgStore } from '../../../../stores/ProfileImgStore/ProfileImgStore';

export default function ProfileModal() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isOpen, setIsOpen } = useModal();
  const { setModalState } = useModalState();
  const navigate = useNavigate();
  //프로필 사진 변경 기능
  const { imageUrl, setImageUrl } = useProfileImgStore();
  const [saveState, setSaveState] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tempImgUrl, setTempImgUrl] = useState<string | null>(localStorage.getItem('profileImage'));

  useEffect(() => {
    if (imageUrl) {
      localStorage.setItem('profileImage', imageUrl);
      console.log('로컬스토리지에 사진 저장!!!!', imageUrl);
    }
  }, [imageUrl]);

  // 이미지 변경
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file!);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setTempImgUrl(base64Image);
        localStorage.setItem('profileImage', base64Image);
        if (saveState) {
          // localStorage.setItem('profileImage', base64Image);
          setImageUrl(base64Image);
          setSaveState(false);
        } else {
          localStorage.setItem('profileImage', tempImgUrl!);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSave = (saveState: boolean) => {
    console.log('이미지 세이브 실행');
    console.log(selectedFile);
    if (selectedFile === null) {
      alert('파일을 선택해 주세요');
      return;
    }
    if (saveState) {
      setImageUrl(tempImgUrl!);
      setSaveState(false);
      console.log('이미지 변경 버튼 눌림', imageUrl);
      localStorage.setItem('profileImage', imageUrl);
      console.log('로컬스토리지에 사진 저장');
    }
  };

  return isOpen ? (
    <>
      <ProfileModalContainer onClick={() => setIsOpen(false)}>
        <RiCloseLargeFill className="closeIcon" />
        <ProfileModalBox onClick={handleModalCloseClick}>
          <ProfileModalHeaderBox>
            <p>프로필</p>
            <button
              onClick={() => {
                console.log(selectedFile);
                console.log('선택한 임시 이미지', tempImgUrl);
                console.log('현재 저장된 이미지 값', imageUrl);
              }}>
              콘솔
            </button>
            <ProfileCompleteButton
              onClick={() => {
                setIsOpen(false);
                console.log('모달 닫기 실행');
                setModalState('');
                console.log('모달 상태 초기화');
                setSaveState(true);
                console.log('저장 상태: True 변경');
                handleImageSave(true);
              }}>
              완료
            </ProfileCompleteButton>
          </ProfileModalHeaderBox>
          <ProfileModalBodyBox>
            <ProfileModalImgBox>
              <ProfileImg
                id={'profile_img'}
                src={tempImgUrl === null ? imageUrl : tempImgUrl}
                onClick={() => handleFileSelectorClick(fileInputRef)}
                alt={'프로필 사진'}
              />
              <ProfileImgChangeCameraIcon className="icons" />
            </ProfileModalImgBox>
            <FaCamera className="camera" />
            <input
              type={'file'}
              accept={'image/jpeg, image/png'}
              ref={fileInputRef}
              hidden={true}
              onChange={(e) => handleImageChange(e)}
            />
            <ProfileModalMainBox>
              <ProfileNameText>이름</ProfileNameText>
              <ProfileLogOutButton
                onClick={() => {
                  setIsOpen(false);
                  setModalState('');
                  navigate('/');
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
