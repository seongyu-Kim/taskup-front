import logo from '../../../assets/logo_color.webp';
import tempPhoto from '../../../assets/임시 프로필사진.png';
import { HiPencilSquare } from 'react-icons/hi2';
import {
  DetailDiv,
  LogoImg,
  NameDiv,
  ProfileImg,
  SideBarButton,
  SidebarContainer,
} from './SideBar.styled';

export default function SideBar() {
  return (
    <>
      <SidebarContainer>
        <LogoImg src={logo} alt={'TaskUp'} />
        <DetailDiv>
          <ProfileImg src={tempPhoto} alt={'프로필 사진'} />
          <NameDiv>
            <p>이름</p>
            <HiPencilSquare />
          </NameDiv>
          <SideBarButton bottom={'140px'}>새 프로젝트</SideBarButton>
          <SideBarButton bottom={'80px'}>알림 확인</SideBarButton>
        </DetailDiv>
      </SidebarContainer>
    </>
  );
}
