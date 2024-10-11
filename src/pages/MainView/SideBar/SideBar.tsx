import logo from '../../../assets/logo_color.webp';
import tempPhoto from '../../../assets/임시 프로필사진.png';
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

export default function SideBar() {
  const { setIsOpen } = useModal();
  const { setModalState } = useModalState();

  return (
    <>
      <SidebarContainer>
        <LogoImg src={logo} alt={'TaskUp'} />
        <DetailDiv>
          <ProfileBox>
            <ProfileImg src={tempPhoto} alt={'프로필 사진'} />
            <NameBox
              onClick={() => {
                setModalState('Profile');
                setIsOpen(true);
              }}>
              <p>이름</p>
              <HiPencilSquare />
            </NameBox>
          </ProfileBox>

          <SideBarButton bottom={'140px'}>새 프로젝트</SideBarButton>
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
