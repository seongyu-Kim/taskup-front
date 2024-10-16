import styled from 'styled-components';
import SidebarDetailProps from '@/type/SidebarDetailType';

//사이드 바 기본
export const SidebarContainer = styled.div`
  background: #2d3f63;
  height: 100%;
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
//사이드 바 기본 확장 - 사진, 이름, 아이콘
export const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: white;
  position: absolute;
  flex-direction: column;
`;
export const NameBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

//로고 이미지
export const LogoImg = styled.img`
  width: 300px;
  height: 300px;
  position: absolute;
  top: -100px;
`;
//프로필 이미지
export const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  background: #222127;
  //position: absolute;
`;

// 사이드 바 내용 Div
export const DetailDiv = styled.div`
  display: flex;
  height: 100%;
  width: 350px;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;
  position: relative;
`;
// 사이드바 버튼
export const SideBarButton = styled.button<SidebarDetailProps>`
  position: absolute;
  bottom: ${(props) => props.bottom};
  color: white;
  background: #647ea1;
  border: none;
  border-radius: 8px;
  width: 180px;
  height: 50px;
  cursor: pointer;
  &:hover {
    background: #5a7291;
  }
`;
