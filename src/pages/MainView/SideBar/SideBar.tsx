import logo from '@assets/logo_color.webp';
import { HiPencilSquare } from 'react-icons/hi2';
import * as Styled from './SideBar.styled';
import { useModal, useModalState } from '@stores/ModalStore/ModalStore';
import { useNavigate } from 'react-router-dom';
import { useProfileImgStore } from '@stores/ProfileImgStore/ProfileImgStore';
import { useEffect, useState } from 'react';
import { useUserStore } from '@stores/UserStore/userStore';
import { Message, useNoticeMessage } from '@stores/UserMessageStore/UserMessagestore';
import { EventSourcePolyfill } from 'event-source-polyfill';
import apiMainPage from '@apis/apiMainPage';

export default function SideBar() {
  const { setIsOpen } = useModal();
  const { setModalState } = useModalState();
  const { imageUrl, setImageUrl } = useProfileImgStore();
  const { user, isLoggedIn } = useUserStore();
  const { setMessage } = useNoticeMessage();
  const navigate = useNavigate();
  //프로필 데이터 요청
  const [userImage, setUserImage] = useState<string | null>(null);
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const responseUserProfile = await apiMainPage.get(`/user/profile`);
        const userName = responseUserProfile.data.data.name;
        if (userName === user!.name && responseUserProfile.data.data.profileImage !== null) {
          const file = responseUserProfile.data.data.profileImage.split(
            'kdt-react-node-1-team03.elicecoding.com:5000',
          )[1];
          const loadUserImg = async () => {
            try {
              const responseUserImg = await apiMainPage.get(`${file}`, { responseType: 'blob' });
              if (responseUserImg.data) {
                const imgBlob = new Blob([responseUserImg.data], { type: 'image/jpeg' });
                const imgUrl = URL.createObjectURL(imgBlob);
                setUserImage(imgUrl);
                setImageUrl(imgUrl);
              }
            } catch (error) {
              console.log(error);
            }
          };
          loadUserImg().catch(console.error);
        }
      } catch (error) {
        console.error('Profile Img Load Error', error);
      }
    };
    loadUserProfile().catch(console.error);
  }, []);

  //sse 알림 수신 부분
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

    eventSource.onerror = (error: Event) => {
      console.error('SSE 연결에러', error);
      console.log('서버 연결 끊김'); // 서버 연결 끊김 메시지 출력
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [isLoggedIn]);

  return (
    <>
      <Styled.SidebarContainer>
        <Styled.LogoImg src={logo} alt="TaskUp" />
        <Styled.DetailDiv>
          <Styled.ProfileBox>
            <Styled.ProfileImg src={userImage || imageUrl} alt="프로필 사진" />
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
