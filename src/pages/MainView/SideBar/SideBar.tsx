import logo from '../../../assets/logo_color.webp';
import { HiPencilSquare } from 'react-icons/hi2';
import {
  DetailDiv,
  LogoImg,
  NameBox,
  ProfileBox,
  ProfileImg,
  SideBarButton,
  SidebarContainer,
} from './SideBar.styled';
import { useModal, useModalState } from '../../../stores/ModalStore/ModalStore';
import { useNavigate } from 'react-router-dom';
import { useProfileImgStore, useSaveState } from '../../../stores/ProfileImgStore/ProfileImgStore';
import { useEffect, useState } from 'react';

export default function SideBar() {
  const { setIsOpen } = useModal();
  const { setModalState } = useModalState();
  const navigate = useNavigate();
  const { imageUrl } = useProfileImgStore();
  const { saveState, setSaveState } = useSaveState();
  const [localImg, setLocalImg] = useState<string | null>(null);
  //로컬스토리지에서 유저 데이터 가져오기
  const userData = localStorage.getItem('userData');
  const { email, name }: { email: string; name: string } = JSON.parse(userData!);
  //초기 프로필 사진 없을 때 기본 사진
  useEffect(() => {
    const saveImg = localStorage.getItem('profileImage');
    if (saveImg === null) {
      setLocalImg(imageUrl);
    }
  }, []);

  useEffect(() => {
    const saveImg = localStorage.getItem('profileImage');
    if (saveImg) {
      setLocalImg(saveImg);
    }
  }, [imageUrl]);

  return (
    <>
      <SidebarContainer>
        <LogoImg src={logo} alt={'TaskUp'} />
        <DetailDiv>
          <ProfileBox>
            <ProfileImg src={localImg!} alt={'프로필 사진'} />
            <NameBox
              onClick={() => {
                setModalState('Profile');
                setIsOpen(true);
                setSaveState(!saveState);
              }}>
              <p>{name}</p>
              <HiPencilSquare />
            </NameBox>
            <p>{email}</p>
          </ProfileBox>

          <SideBarButton
            bottom={'140px'}
            onClick={() => {
              navigate('/create'); //////
            }}>
            새 프로젝트
          </SideBarButton>
          <SideBarButton
            bottom={'80px'}
            onClick={() => {
              setModalState('Notice');
              setIsOpen(true);
            }}>
            알림 확인
          </SideBarButton>
        </DetailDiv>
      </SidebarContainer>
    </>
  );
}
