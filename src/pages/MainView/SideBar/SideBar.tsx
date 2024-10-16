import logo from '@assets/logo_color.webp';
import { HiPencilSquare } from 'react-icons/hi2';
import * as Styled from './SideBar.styled';
import { useModal, useModalState } from '@stores/ModalStore/ModalStore';
import { useNavigate } from 'react-router-dom';
import { useProfileImgStore } from '@stores/ProfileImgStore/ProfileImgStore';
import { useEffect, useState } from 'react';
import defaultImage from '@assets/임시 프로필사진.png';

export default function SideBar() {
  const { setIsOpen } = useModal();
  const { setModalState } = useModalState();
  const { imageUrl } = useProfileImgStore();
  const [nowImg, setNowImg] = useState<string | null>(null);
  const navigate = useNavigate();
  //로컬스토리지에서 유저 데이터 가져오기
  const userData = localStorage.getItem('userData');
  const { email, name }: { email: string; name: string } = JSON.parse(userData!);
  //초기 프로필 사진 없을 때 기본 사진
  useEffect(() => {
    if (imageUrl == '/static/media/임시 프로필사진.4d93130773eae276d513.png') {
      const saveImg = localStorage.getItem('profileImage');
      if (saveImg === null) {
        setNowImg(imageUrl);
      }
    }
  }, []);

  useEffect(() => {
    const saveImg = localStorage.getItem('profileImage');
    if (saveImg) {
      setNowImg(saveImg);
    }
  }, [imageUrl]);

  return (
    <>
      <Styled.SidebarContainer>
        <Styled.LogoImg src={logo} alt="TaskUp" />
        <Styled.DetailDiv>
          <Styled.ProfileBox>
            <Styled.ProfileImg src={nowImg || defaultImage} alt="프로필 사진" />
            <Styled.NameBox
              onClick={() => {
                setModalState('Profile');
                setIsOpen(true);
              }}>
              <p>{name}</p>
              <HiPencilSquare />
            </Styled.NameBox>
            <p>{email}</p>
          </Styled.ProfileBox>
          <Styled.SideBarButton
            bottom="140px"
            onClick={() => {
              navigate('/create');
            }}>
            새 프로젝트
          </Styled.SideBarButton>
          <Styled.SideBarButton
            bottom="80px"
            onClick={() => {
              setModalState('Notice');
              setIsOpen(true);
            }}>
            알림 확인
          </Styled.SideBarButton>
        </Styled.DetailDiv>
      </Styled.SidebarContainer>
    </>
  );
}
