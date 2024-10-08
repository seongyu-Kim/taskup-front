import styled from 'styled-components';
import logo from '../../../assets/logo_color.webp';
import tempPhoto from '../../../assets/임시 프로필사진.png';
import SidebarDetailProps from '../../../types/SidebarDetailType';
import { HiPencilSquare } from 'react-icons/hi2';

//사이드 바 기본
const SidebarDiv = styled.div`
  background: #2d3f63;
  height: 100vh;
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
//사이드 바 기본 확장 - 이름, 아이콘
const NameDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: white;
`;
//로고 이미지
const LogoImg = styled.img`
  width: 300px;
  height: 300px;
  position: absolute;
  top: -100px;
`;
//프로필 이미지
const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

// 사이드 바 내용 Div
const DetailDiv = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;
  position: relative;
`;
// 사이드바 버튼
const SideBarButton = styled.button<SidebarDetailProps>`
  position: absolute;
  bottom: ${(props) => props.bottom};
  color: white;
  background: #647ea1;
  border: none;
  border-radius: 8px;
  width: 180px;
  height: 50px;
  cursor: pointer;
`;

export default function SideBar() {
  return (
    <>
      <SidebarDiv>
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
      </SidebarDiv>
    </>
  );
}
