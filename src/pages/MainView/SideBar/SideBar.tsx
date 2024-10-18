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

export default function SideBar() {
  const { setIsOpen } = useModal();
  const { setModalState } = useModalState();
  const { imageUrl } = useProfileImgStore();
  const [nowImg, setNowImg] = useState<string | null>(null);
  const navigate = useNavigate();
  //로컬스토리지에서 유저 데이터 가져오기
  // const userData = localStorage.getItem('userData');
  // const { email, name }: { email: string; name: string } = JSON.parse(userData!);
  const { user, isLoggedIn } = useUserStore();
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

  const { setMessage } = useNoticeMessage();
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

    //이벤트 연결 확인용 (디버깅용이라 추후 삭제)
    // eventSource.onopen = () => {
    //   // console.log('SSE 연결 성공');
    // };
    //오류 발생 처리
    eventSource.onerror = (error) => {
      console.error('SSE 연결에러', error);
      eventSource.close();
    };

    if (!isLoggedIn) {
      eventSource.close();
      // console.log('SSE 연결 종료');
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
