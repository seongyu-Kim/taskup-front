import logo from '@assets/logo_color.webp';
import { HiPencilSquare } from 'react-icons/hi2';
import * as Styled from './SideBar.styled';
import { useModal, useModalState } from '@stores/ModalStore/ModalStore';
import { useNavigate } from 'react-router-dom';
import { useProfileImgStore } from '@stores/ProfileImgStore/ProfileImgStore';
import { useEffect, useState } from 'react';
import defaultImage from '@assets/임시 프로필사진.png';
import { useUserStore } from '@stores/UserStore/userStore';
import { Message, useNoticeMessage } from '@stores/UserMessageStore/UserMessagestore';
import { EventSourcePolyfill } from 'event-source-polyfill';
import apiMainPage from '@apis/apiMainPage';

export default function SideBar() {
  const { setIsOpen } = useModal();
  const { setModalState } = useModalState();
  const { imageUrl } = useProfileImgStore();
  const [nowImg, setNowImg] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user, isLoggedIn } = useUserStore();
  const { setMessage } = useNoticeMessage();
  //데이터 요청
  useEffect(() => {
    const loadUserProfileImg = async () => {
      try {
        const response = await apiMainPage.get(`/user/profile`);
        console.log('회원조회', response.data.data);
      } catch (error) {
        console.error('Profile Img Load Error', error);
      }
    };
    loadUserProfileImg().catch(console.error);
  });
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

  useEffect(() => {
    const sseUrl = 'http://kdt-react-node-1-team03.elicecoding.com:5000/events';
    const eventSource = new EventSourcePolyfill(sseUrl, { heartbeatTimeout: 86400000 });

    eventSource.onmessage = ({ data }) => {
      if (data !== '연결되었습니다') {
        try {
          const newMessage: Message = JSON.parse(data);
          setMessage(newMessage);
        } catch (error) {
          console.log('알림 요청 오류', error);
        }
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE 연결에러', error);
      eventSource.close();
    };

    if (!isLoggedIn) {
      eventSource.close();
    }
  }, [isLoggedIn]);

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
              <p>{user!.name}</p>
              <HiPencilSquare />
            </Styled.NameBox>
            <p>{user!.email}</p>
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
