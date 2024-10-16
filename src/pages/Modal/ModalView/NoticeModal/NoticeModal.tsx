import * as Styled from './NoticeModal.styled';
import { useModal } from '@stores/ModalStore/ModalStore';
import { RiCloseLargeFill } from 'react-icons/ri';
import { handleModalCloseClick } from '@utils/HandleModalCloseClick';
import { useEffect, useState } from 'react';
import axios from '@api/axios';
import MainPageDefaultButton from '@components/MainPageDefaultButton/MainPageDefaultButton';
import { useUserStore } from '@stores/UserStore/userStore';

interface NoticeDataType {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
}
//임시
interface Task {
  id: number;
  title: string;
  sub_title: string;
  content: string;
  status: number;
  members: string[];
  startDate: string;
  endDate: string;
  user: {
    name: string;
  };
}

export default function NoticeModal() {
  const { isOpen, setIsOpen } = useModal();
  // const [noticeData, setNoticeData] = useState<NoticeDataType[]>([]);
  //임시
  const [noticeData, setNoticeData] = useState<Task[]>([]);
  const { user } = useUserStore();

  // useEffect(() => {
  //   const callNoticeData = async () => {
  //     try {
  //       //추후 주소 변경
  //       const response = await axios.get('/tasks/calender');
  //       if (response) {
  //         setNoticeData(response.data.data);
  //       }
  //     } catch (error) {
  //       console.log('ERROR', error);
  //     }
  //   };
  //   callNoticeData().catch(console.error);
  // }, []);

  //임시 전체 데이터 가져오기
  useEffect(() => {
    const callNoticeData = async () => {
      try {
        const response = await axios.get('/tasks');
        if (response) {
          setNoticeData(response.data.data.data);
        }
      } catch (error) {
        console.log('ERROR', error);
      }
    };
    callNoticeData().catch(console.error);
  }, []);
  if (!user) {
    return null;
  }
  //사용자 필터링
  const userNoticeData = noticeData.filter((item) => item.members.includes(user.name));

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <Styled.NoticeModalContainer onClick={() => setIsOpen(false)}>
        <RiCloseLargeFill className="closeIcon" />
        <button onClick={() => console.log(noticeData)}>데이터 확인</button>
        <Styled.NoticeModalBox onClick={handleModalCloseClick}>
          <Styled.NoticeModalHeaderBox>
            <p>알림</p>
          </Styled.NoticeModalHeaderBox>
          <Styled.NoticeModalBodyBox>
            <ul>
              {userNoticeData.map((item) => {
                const endDate = new Date(item.endDate);
                const nowDate = Date.now();
                const dDay = Math.ceil((endDate.getTime() - nowDate) / (1000 * 3600 * 24) + 1);
                if (dDay <= 7) {
                  return (
                    <li key={item.id}>
                      <p>프로젝트명: {item.title}</p>
                      <Styled.NoticeText color={dDay <= 3 ? 'red' : 'black'}>
                        마감일이 {dDay}일 남았습니다.
                      </Styled.NoticeText>
                    </li>
                  );
                }
              })}
            </ul>
          </Styled.NoticeModalBodyBox>
          <MainPageDefaultButton
            onClick={() => {
              setIsOpen(false);
            }}>
            닫기
          </MainPageDefaultButton>
        </Styled.NoticeModalBox>
      </Styled.NoticeModalContainer>
    </>
  );
}
