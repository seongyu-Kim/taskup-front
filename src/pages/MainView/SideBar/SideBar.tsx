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
import { useProfileImgStore } from '../../../stores/ProfileImgStore/ProfileImgStore';
// import { useEffect } from 'react';

export default function SideBar() {
  const { setIsOpen } = useModal();
  const { setModalState } = useModalState();
  const navigate = useNavigate();
  const { imageUrl } = useProfileImgStore();
  return (
    <>
      <SidebarContainer>
        <LogoImg src={logo} alt={'TaskUp'} />
        <DetailDiv>
          <ProfileBox>
            <ProfileImg src={imageUrl} alt={'프로필 사진'} />
            <NameBox
              onClick={() => {
                setModalState('Profile');
                setIsOpen(true);
              }}>
              <p>이름</p>
              <HiPencilSquare />
            </NameBox>
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
